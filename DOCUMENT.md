## How to...

```bash
docker-compose up --build -d --remove-orphans
docker-compose exec app sh # Let's development!
```

## Development back story...

```bash
npx vue create vue
# Vue CLI v4.5.4
# ? Please pick a preset: Manually select features
# ? Check the features needed for your project: Choose Vue version, Babel, TS, PWA, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
# ? Choose a version of Vue.js that you want to start the project with 2.x
# ? Use class-style component syntax? No
# ? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
# ? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
# ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
# ? Pick a linter / formatter config: Prettier
# ? Pick additional lint features: Lint on save
# ? Pick a unit testing solution: Jest
# ? Pick an E2E testing solution: Cypress
# ? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
cd ./vue
yarn add only-allow -D
vim ./public/manifest.json
```

paste/save it.
```json
{
  "name": "COW-STACK",
  "short_name": "cow-stack",
  "theme_color": "#eae264",
  "background_color": "#eae264",
  "display": "standalone",
  "Scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "img/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "img/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "splash_pages": null
}

```

```bash
vim ./jest.config.js
```

paste/save it.
```json
module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/*.ts?(x)'],
};
```

```bash
vim ./.prettierrc.js
```

paste/save it.
```javascript
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  printWidth: 120,
};

```

```bash
vim ./tsconfig.json
```

paste/save it.
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "jest"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ],
  "strict": true,
  "noImplicitAny": false,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true,
  "noImplicitThis": true,
  "alwaysStrict": true
}

```


```bash
npx yo express-no-stress-typescript express
```

```
? ==========================================================================
We're constantly looking for ways to make yo better!
May we anonymously report usage statistics to improve the tool over time?
More info: https://github.com/yeoman/insight & http://yeoman.io
========================================================================== Yes
? App description [My cool TypeScript app] cow-stack-express
? API Root [/api/v1]
? Version [1.0.0]
? OpenAPI spec version OpenApi 3
```

TODO: write ts-config for express.

```bash
cd express
rm package-lock.json
rm -rf node_modules
yarn
yarn remove chai mocha @types/chai @types/mocha
yarn add typedoc typedoc-plugin-markdown jest ts-jest @types/jest eslint-plugin-jest only-allow api-spec-converter swagger-ui-express @types/swagger-ui-express dredd @types/shelljs -D
yarn add @line/bot-sdk @slack/bolt axios tsoa@2.5.14 helmet moment typeorm bcrypt jsonwebtoken
vim package.json
```

replace scripts to it.
```
    "start": "node ./dist/index.js",
    "build": "ts-node ./build.ts && tsc --lib es2020",
    "dev": "nodemon ./server/index.ts | pino-pretty",
    "dev:debug": "nodemon --exec 'node -r ./ts-node/register --inspect-brk' ./server/index.ts | pino-pretty",
    "lint": "tsc --noEmit && eslint './server/**/*.{js,ts,tsx}' './*.{js,ts,tsx}' './.*.{js,ts,tsx}' --config ./.eslintrc.js --no-ignore --cache --color --fix",
    "test": "jest",
    "test:debug": "jest --watch",
    "swagger-yaml": "api-spec-converter --from openapi_3 --to openapi_3 --syntax=yaml --order=openapi --source=./server/common/swagger.json > ./server/common/swagger.yaml",
    "e2e": "yarn swagger-yaml && dredd ./server/common/swagger.yaml http://localhost:3000/api -d",
    "readme": "node ../node_modules/readme-md-generator/src/index.js"
```

replace .prettierrc.js to it.
```javascript
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  printWidth: 120,
};

```

```bash
vim ./jest.config.js
```

paste/save it.
```javascript
module.exports = {
  roots: ['<rootDir>/server'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/server/api/services/*.ts?(x)'],
};

```

```bash
vim ./build.ts
```

paste/save it.
```typescript
import fs from 'fs';
import packageJSON from './package.json';
import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;
import { generateRoutes, generateSwaggerSpec, RoutesConfig, SwaggerConfig } from 'tsoa';

// Define setting of automatic generating Swagger.json
const swaggerOptions: SwaggerConfig = {
  basePath: '/api',
  entryFile: './server/common/server.ts',
  specVersion: 3,
  outputDirectory: './server/common/',
  controllerPathGlobs: ['./server/api/controllers/*/controller.ts'],
  version: packageJSON.version,
  host: 'localhost:3000',
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'access_token',
      in: 'query',
    },
    jwt: {
      type: 'apiKey',
      name: 'app_token',
      in: 'header',
    },
  },
};

// Define setting of Automatic generating routing file
const routeOptions: RoutesConfig = {
  basePath: '/api',
  entryFile: './server/common/server.ts',
  routesDir: './server',
  middleware: 'express',
  authenticationModule: './server/api/middlewares/authentication.ts',
};

class Builder {
  readonly outDir: string;
  readonly swaggerOptions: SwaggerConfig;
  readonly routeOptions: RoutesConfig;

  constructor(ops: { outDir: string; swaggerOptions: SwaggerConfig; routeOptions: RoutesConfig }) {
    this.outDir = ops.outDir;
    this.swaggerOptions = ops.swaggerOptions;
    this.routeOptions = ops.routeOptions;
  }

  public async run(): Promise<void> {
    this.resetOutDir();
    await this.generateSwaggerSpecAndRoutes();
    this.addTitleToSwaggerJSON();
  }

  private resetOutDir(): void {
    s.rm('-rf', outDir);
    s.mkdir(outDir);
    s.cp('.env', `${outDir}/.env`);
  }

  private async generateSwaggerSpecAndRoutes(): Promise<void> {
    await generateSwaggerSpec(this.swaggerOptions, this.routeOptions);
    await generateRoutes(this.routeOptions, this.swaggerOptions);
  }

  private addTitleToSwaggerJSON(): void {
    const swaggerJSON = JSON.parse(fs.readFileSync('./server/common/swagger.json', 'utf-8'));
    swaggerJSON.info.title = packageJSON.name;
    fs.writeFileSync('./server/common/swagger.json', JSON.stringify(swaggerJSON, null, 2));
  }
}

try {
  new Builder({ outDir, swaggerOptions, routeOptions }).run();
} catch (err) {
  throw new Error(err);
}

```

```bash
rm -rf ./test
mkdir -p ./server/__tests__/services
touch ./server/__tests__/services/examples.test.ts
rm ./server/common/api.yml
rm ./server/common/openapi.ts
vim ./server/common/server.ts
```

paste/save it.
```typescript
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
import { redirectToHTTPS } from 'express-http-to-https';
import * as line from '@line/bot-sdk';
import { LineEvRouter } from '../line';
import * as slackBolt from '@slack/bolt';

class ExpressServer {
  private app = express();
  private lineSignatureMiddleware;

  constructor() {
    const root = path.normalize(__dirname + '/../..');
    this.app.set('appPath', `${root}client`);
    this.app.use(helmet());
    this.app.use(cookieParser(process.env.SESSION_SECRET || 'mySecret'));
    this.app.use(express.static(`${root}/../vue/dist`));

    // Define app's routing
    RegisterRoutes(this.app);

    // Set Swagger UI
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public async setBodyParserOrLineSignatureParser(
    config?: line.MiddlewareConfig
  ): Promise<void> {
    this.app.use(this.bodyParserOrLineSignatureParser(line.middleware(config)));
  }

  private bodyParserOrLineSignatureParser(
    lineSignatureMiddleware?
  ): (req, res, next) => void {
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

  public async handleLineEv(
    webHookPath: string,
    config: line.ClientConfig
  ): Promise<void> {
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

  public async setRedirectToHTTPS(): Promise<void> {
    this.app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
  }

  public async listen(port: number): Promise<void> {
    const welcome = (p: number) => (): void =>
      L.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(this.app).listen(port || 3000, welcome(port || 3000));
  }
}

export const expressServer = new ExpressServer();

```

```bash
vim ./server/index.ts
```

paste/save it.
```typescript
import './common/env';
import { expressServer } from './common/server';
// import { createConnection } from 'typeorm';

const lineConfig = {
  channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
  channelSecret: process.env.LINE_CH_SECRET.toString(),
};

const slackReceiverOpts = {
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: {
    commands: '/commands',
    events: '/events',
    interactive: '/interactive',
  },
};

const port = parseInt(process.env.PORT);

// createConnection().then(
(async (): Promise<void> => {
  await expressServer.setBodyParserOrLineSignatureParser(lineConfig);
  await expressServer.handleLineEv('/webhook/line/', lineConfig);
  await expressServer.setSlackBolt(
    '/webhook/slack/',
    process.env.SLACK_BOT_TOKEN,
    slackReceiverOpts
  );
  // await expressServer.setNotFoundPage();
  // await expressServer.setErrPage();
  await expressServer.listen(port);
})();
// );

```

```bash
vim ./server/common/line/helper.ts
```
paste/save it.
```typescript
import * as line from '@line/bot-sdk';
import {
  MsgTask,
  MsgTypeText,
  MsgTypeImage,
  MsgTypeVideo,
  MsgTypeAudio,
  MsgTypeFile,
  MsgTypeLocation,
  MsgTypeSticker,
} from './interface';
import L from '../common/logger';

export class LineEvRouteingHelper {
  public async hears(event: line.WebhookEvent): Promise<void> {
    if (event.type === 'message') {
      return this.msgEvHandler(event);
    }
  }

  private msgTasks: MsgTask[] = [];

  public msgEv(msgTask: MsgTask): void {
    this.msgTasks.push(msgTask);
  }

  private async msgEvHandler(event): Promise<void> {
    L.info(event);

    let msgTaskI;

    for (msgTaskI in this.msgTasks) {
      const msgTask = this.msgTasks[msgTaskI];

      if ('source' in msgTask) {
        if (
          'type' in msgTask.source &&
          event.source.type !== msgTask.source.type
        ) {
          continue;
        }
        if (
          'userId' in msgTask.source &&
          event.source.userId !== msgTask.source.userId
        ) {
          continue;
        }
        if (
          'groupId' in msgTask.source &&
          event.source['groupId'] !== msgTask.source.groupId
        ) {
          continue;
        }
        if (
          'roomId' in msgTask.source &&
          event.source['roomId'] !== msgTask.source.roomId
        ) {
          continue;
        }
      }
      if (!('type' in msgTask)) {
        msgTask.task(event);
        continue;
      }
      if (
        msgTask.type instanceof MsgTypeText &&
        event.message.type === 'text'
      ) {
        if (
          'text' in msgTask.type &&
          !event.message.text.match(msgTask.type.text)
        ) {
          continue;
        }
        msgTask.task(event);
        break;
      }
      if (
        msgTask.type instanceof MsgTypeImage &&
        event.message.type === 'image'
      ) {
        // TODO: Coming soon...
        continue;
      }
      if (
        msgTask.type instanceof MsgTypeVideo &&
        event.message.type === 'video'
      ) {
        // TODO: Coming soon...
        continue;
      }
      if (
        msgTask.type instanceof MsgTypeAudio &&
        event.message.type === 'audio'
      ) {
        // TODO: Coming soon...
        continue;
      }
      if (
        msgTask.type instanceof MsgTypeFile &&
        event.message.type === 'file'
      ) {
        // TODO: Coming soon...
        continue;
      }
      if (
        msgTask.type instanceof MsgTypeLocation &&
        event.message.type === 'location'
      ) {
        // TODO: Coming soon...
        continue;
      }
      if (
        msgTask.type instanceof MsgTypeSticker &&
        event.message.type === 'sticker'
      ) {
        // TODO: Coming soon...
        continue;
      }
    }

    if (parseInt(msgTaskI) === this.msgTasks.length - 1) {
      // TODO: Coming soon...
      return;
    }

    return;
  }

  // public followEve(task: Task) {}

  // public unFollowEve(task: Task) {}

  // public joinEve(task: Task) {}

  // public leaveEve(task: Task) {}

  // public memberJoinEve(task: Task) {}

  // public memberLeaveEve(task: Task) {}

  // public postBackEve(task: Task) {}

  // public accountLinkEve(task: Task) {}
}

```

```bash
vim ./server/common/line/index.ts
```

paste/save it.
```typescript
import * as line from '@line/bot-sdk';
// import { MsgTypeText } from './interface';
import { LineEvRouteingHelper } from './helper';
// import { LineModel } from '../api/models/line';
// import { LineService } from '../api/services/line';

const lineEvRouteingHelper = new LineEvRouteingHelper();

export class LineEvRouter {
  constructor(config: line.ClientConfig) {
    const lineClient: line.Client = new line.Client(config);
    console.log(lineClient);
  }

  public async hears(event: line.WebhookEvent): Promise<void> {
    return lineEvRouteingHelper.hears(event);
  }
}

```

```bash
vim ./server/common/line/interface.ts
```

paste/save it.
```typescript
export type MsgTask = {
  task: Task;
  source?: Source;
  type?:
    | MsgTypeText
    | MsgTypeImage
    | MsgTypeVideo
    | MsgTypeAudio
    | MsgTypeFile
    | MsgTypeLocation
    | MsgTypeSticker;
};

export type Task = (event) => void;

export type Source = {
  type?: 'user' | 'group' | 'room';
  userId?: string;
  groupId?: string;
  roomId?: string;
};

export type ContentProvider = 'line' | 'external';

export type MinMax = {
  min?: number;
  max?: number;
};

export type Media = {
  contentProvider?: ContentProvider;
  duration?: MinMax;
};

export class MsgTypeText {
  constructor(text?: RegExp) {
    this.text = text;
  }
  public text?: RegExp;
}

export type StickerResourceType =
  | 'STATIC'
  | 'ANIMATION'
  | 'SOUND'
  | 'ANIMATION_SOUND'
  | 'POPUP'
  | 'POPUP_SOUND'
  | 'NAME_TEXT'
  | 'PER_STICKER_TEXT';

export class MsgTypeImage {
  constructor(contentProvider?: ContentProvider) {
    this.contentProvider = contentProvider;
  }
  public contentProvider?: ContentProvider;
}

export class MsgTypeVideo {
  constructor(media?: Media) {
    this.media = media;
  }
  public media: Media;
}

export class MsgTypeAudio {
  constructor(media?: Media) {
    this.media = media;
  }
  public media: Media;
}

export class MsgTypeFile {
  constructor(fileName?: RegExp, fileSize?: MinMax) {
    this.fileName = fileName;
    this.fileSize = fileSize;
  }
  public fileName?: RegExp;
  public fileSize?: MinMax;
}

export class MsgTypeLocation {
  constructor(
    title?: RegExp,
    address?: RegExp,
    latitude?: MinMax,
    longitude?: MinMax
  ) {
    this.title = title;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
  public title?: RegExp;
  public address?: RegExp;
  public latitude?: MinMax;
  public longitude?: MinMax;
}

export class MsgTypeSticker {
  constructor(
    packageId?: RegExp,
    stickerId?: RegExp,
    stickerResourceType?: StickerResourceType
  ) {
    this.packageId = packageId;
    this.stickerId = stickerId;
    this.stickerResourceType = stickerResourceType;
  }
  public packageId?: RegExp;
  public stickerId?: RegExp;
  public stickerResourceType?: StickerResourceType;
}

```

```bash
vim ./nodemon.json
```

paste/save it.
```json
{
  "execMap": {
    "ts": "ts-node"
  },
  "ignore": ["./server/__tests__/**/*.ts", "./server/__tests__/**/*.spec.ts", ".git", "node_modules"],
  "watch": [
    "server",
    ".env"
  ],
  "ext": "ts,js,json,yaml,yml"
}

```

```bash
vim ./server/api/middlewares/authentication.ts
```

paste/save it.
```typescript
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

class User {
  id: number;
  name: string;
}

export const expressAuthentication = (req: express.Request, securityName: string, scopes?: string[]): Promise<User> => {
  if (securityName === 'api_token') {
    let token: string;
    if (req.query && req.query.access_token && typeof req.query.access_token === 'string') {
      token = req.query.access_token;
    }

    if (token === 'guest') {
      return Promise.resolve({
        id: 1,
        name: 'Guest',
      });
    } else {
      return Promise.reject({});
    }
  }

  if (securityName === 'jwt') {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      }
      jwt.verify(token, '[secret]', (err: unknown, decoded: { scopes: string; id: number; name: string }): void => {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          for (const scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error('JWT does not contain required scope.'));
            }
          }
          if (!('id' in decoded || 'name' in decoded)) {
            reject(new Error('JWT does not contain required id/name.'));
          } else {
            resolve(decoded);
          }
        }
      });
    });
  }
};

```

```bash
vim ormconfig.json
```

paste/save it.
```javascript
module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'development',
  synchronize: false,
  // TODO: update it!
  entities: ['./server/api/entities/*.ts'],
  migrations: ['./server/api/db/migrations/*.ts'],
  subscribers: ['./server/api/db/subscribers/*.ts'],
  cli: {
    entitiesDir: './server/api/entities/',
    migrationsDir: './server/api/db/migrations/',
    subscribersDir: './server/api/db/subscribers/',
  },
};

```

```bash
mkdir ./server/api/entities
vim ./server/api/entities/users.entity.ts
```

```bash
mkdir ./server/api/models
vim ./server/api/models/users.model.ts
```

```bash
yarn add pg
```

msapplication-icon-144x144.png
yarn add prerender-spa-plugin -D
@types/pg -D
npx sort-package-json
npx ts-node ./node_modules/typeorm/cli.js migration:create -n Init
npx ts-node ./node_modules/typeorm/cli.js migration:run
.vscode
eslint-plugin-cypress
