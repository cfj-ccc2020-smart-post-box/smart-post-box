import { Request, Controller, Get, Post, Route } from 'tsoa';
import { PhotosService } from '../../services/photos.service';
import express from 'express';
import multer from 'multer';
import * as line from '@line/bot-sdk';

const photosService = new PhotosService();

const lineClient = new line.Client({
  channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
  channelSecret: process.env.LINE_CH_SECRET.toString(),
});

@Route('photos')
export class PhotosController extends Controller {
  @Get('/last-title/{uniqueCode}')
  public async getLastPhotoTitleByMachineId(uniqueCode: string): Promise<string> {
    const lastTitle = await photosService.getLastPhotoTitleByMachineId(uniqueCode);
    return lastTitle;
  }

  @Post('/receiver/{uniqueCode}')
  public async foo(uniqueCode: string, @Request() req: express.Request): Promise<string> {
    await this.handleFile(req);
    const msg = await photosService.msgOfNewPhoto(
      uniqueCode,
      process.env.SERVER_HOST || 'tmp.cow.kit-victims.org',
      req['files']['upfile']['data']
    );
    await lineClient.pushMessage(msg.destinationId, msg.msg);
    return 'received';
  }

  private handleFile(req: express.Request): Promise<unknown> {
    const multerSingle = multer().single('randomFileIsHere');
    return new Promise((resolve, reject) => {
      multerSingle(req, undefined, async (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
