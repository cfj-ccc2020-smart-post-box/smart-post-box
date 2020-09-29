import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import L from './logger';
import { RegisterRoutes } from '../routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import * as line from '@line/bot-sdk';
import { LineEvRouter } from '../line';
import * as slackBolt from '@slack/bolt';
import { createConnection, Connection, getConnectionManager } from 'typeorm';
import fileUpload from 'express-fileupload';
import { PhotosService } from '../api/services/photos.service';
import morgan from 'morgan';

class ExpressServer {
  private app = express();
  private dbConnection: Connection;
  readonly photosService: PhotosService;

  constructor() {
    const root = path.normalize(__dirname + '/../..');
    this.app.set('appPath', `${root}client`);
    this.app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'", 'https://storage.googleapis.com'],
          imgSrc: ["'self'", 'https://profile.line-scdn.net'],
        },
      })
    );
    this.app.use(helmet.dnsPrefetchControl());
    this.app.use(helmet.expectCt());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.permittedCrossDomainPolicies());
    this.app.use(helmet.referrerPolicy());
    this.app.use(helmet.xssFilter());
    this.app.use(cookieParser(process.env.SESSION_SECRET || 'mySecret'));
    this.app.use(express.static(`${root}/../vue/dist`));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.app.use(morgan('common'));
    this.photosService = new PhotosService();

    // Define app's routing
    RegisterRoutes(this.app);
  }

  public setSwaggerUI(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  public async connectToDB(): Promise<void> {
    try {
      this.dbConnection = await createConnection();
    } catch (err) {
      if (err.name !== 'AlreadyHasActiveConnectionError') {
        throw new Error(err);
      }

      this.dbConnection = getConnectionManager().get('default');
    }
  }

  public async closeDbConnection(): Promise<void> {
    await this.dbConnection.close();
  }

  public async setBodyParserOrLineSignatureParser(config?: line.MiddlewareConfig): Promise<void> {
    this.app.use(this.bodyParserOrLineSignatureParser(line.middleware(config)));
  }

  private bodyParserOrLineSignatureParser(lineSignatureMiddleware?): (req, res, next) => void {
    return (req, res, next): void => {
      if (req.headers['x-line-signature']) {
        lineSignatureMiddleware(req, res, next);
        return;
      }

      this.bodyParserMiddleware(req, res, next);
      this.bodyParserUrlEncoded(req, res, next);
      this.bodyParserText(req, res, next);
    };
  }

  private bodyParserMiddleware = bodyParser.json({
    limit: process.env.REQUEST_LIMIT || '100kb',
  });

  private bodyParserUrlEncoded = bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  });

  private bodyParserText = bodyParser.text({
    limit: process.env.REQUEST_LIMIT || '100kb',
  });

  public async handleLineEv(webHookPath: string, config: line.ClientConfig): Promise<void> {
    this.app.post(webHookPath, (req, res) => {
      Promise.all(req.body.events.map(new LineEvRouter(config).hears))
        .then((result) => res.json(result))
        .catch((err) => {
          L.error(err);
          res.status(500).end();
        });
    });
  }

  public async setSlackBolt(
    webHookPath: string,
    botToken: string,
    receiverOpts: {
      signingSecret: string;
      endpoints: {
        commands: string;
        events: string;
        interactive: string;
      };
    }
  ): Promise<void> {
    const boltReceiver = new slackBolt.ExpressReceiver(receiverOpts);
    const boltApp = boltReceiver.app as express.Application;
    this.app.use(webHookPath, boltApp);

    const bolt = new slackBolt.App({
      receiver: boltReceiver,
      token: botToken,
    });

    bolt.event('app_home_opened', async ({ event, say }) => {
      await say(`Hey there <@${event.user}>!`);
    });
  }

  public async setNotFoundPage(): Promise<void> {
    // 404
    this.app.use((req, res) => {
      if (req.xhr) {
        res.status(404);

        return res.json({
          method: req.method,
          protocol: req.protocol,
          version: req.httpVersion,
          url: req.url,
        });
      }

      res.redirect(301, '/');
    });
  }

  public async setErrPage(): Promise<void> {
    // 500
    this.app.use((err, req, res, next) => {
      console.log(next);

      if (req.xhr) {
        res.status(500);

        res.json({
          method: req.method,
          protocol: req.protocol,
          version: req.httpVersion,
          url: req.url,
          name: err.name,
          message: err.message,
          stack: err.stack,
        });

        return;
      }

      res.redirect(301, '/');
    });
  }

  /**
   * This system was developed for hosting on dokku.
   * Dokku has SSL support. It will automatically redirect to https from http.
   * But, I temporary written this code.
   */
  public setRedirectToHTTPS(): void {
    this.app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });
  }

  public setPhotoReceiver(config: line.ClientConfig, photoHost: string): void {
    const lineClient = new line.Client(config);

    this.app.post('/photo-receiver/:uniqueCode', async (req, res) => {
      res.end('received');

      const msg = await this.photosService.msgOfNewPhoto(
        req.params.uniqueCode,
        photoHost,
        req['files']['upfile']['data']
      );

      await lineClient.pushMessage(msg.destinationId, msg.msg);
    });
  }

  public async listen(port: number): Promise<void> {
    const welcome = (p: number) => (): void =>
      L.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);

    http.createServer(this.app).listen(port || 5000, welcome(port || 5000));
  }
}

export const expressServer = new ExpressServer();
