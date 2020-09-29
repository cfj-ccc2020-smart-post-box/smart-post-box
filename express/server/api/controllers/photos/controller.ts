import L from '../../../common/logger';
import { Controller, Get, Post, Route, Request } from 'tsoa';
import { PhotosService } from '../../services/photos.service';
import * as line from '@line/bot-sdk';
import express from 'express';
import { MachinesModel } from '../../models/machines.model';

const photosService = new PhotosService();

const lineClient = new line.Client({
  channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
  channelSecret: process.env.LINE_CH_SECRET.toString(),
});

const machinesModel = new MachinesModel();

const base64Cache: { [key: string]: { base64: string; count: number } } = {};

@Route('photos')
export class PhotosController extends Controller {
  @Get('/last-title/{uniqueCode}')
  public async getLastPhotoTitleByMachineId(uniqueCode: string): Promise<string> {
    const lastTitle = await photosService.getLastPhotoTitleByMachineId(uniqueCode);
    return lastTitle;
  }

  @Post('/receiver/{uniqueCode}/{length}/{base64}')
  public async receivePhotoData(uniqueCode: string, length: number, @Request() req: express.Request): Promise<string> {
    if (!(await machinesModel.getMachineByUniqueCode(uniqueCode))) {
      return 'invalid unique code.';
    }

    if (length > 20) {
      return 'plz under 20.';
    }

    if (!(uniqueCode in base64Cache)) {
      base64Cache[uniqueCode] = {
        base64: '',
        count: 0,
      };
    }

    base64Cache[uniqueCode].base64 = req.path.split(`${uniqueCode}/${length}/`)[1];
    ++base64Cache[uniqueCode].count;

    if (length !== base64Cache[uniqueCode].count) {
      return 'received';
    }

    const msg = await photosService.msgOfNewPhoto(
      uniqueCode,
      process.env.SERVER_HOST || 'tmp.cow.kit-victims.org',
      base64Cache[uniqueCode].base64
    );

    base64Cache[uniqueCode] = null; // GC

    await lineClient.pushMessage(msg.destinationId, msg.msg);

    return 'received';
  }
}
