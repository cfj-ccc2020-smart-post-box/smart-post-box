import { Controller, Get, Post, Route } from 'tsoa';
import { PhotosService } from '../../services/photos.service';
import * as line from '@line/bot-sdk';

const photosService = new PhotosService();

const lineClient = new line.Client({
  channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
  channelSecret: process.env.LINE_CH_SECRET.toString(),
});

const base64Cache: { [key: string]: string } = {};

@Route('photos')
export class PhotosController extends Controller {
  @Get('/last-title/{uniqueCode}')
  public async getLastPhotoTitleByMachineId(uniqueCode: string): Promise<string> {
    const lastTitle = await photosService.getLastPhotoTitleByMachineId(uniqueCode);
    return lastTitle;
  }

  @Post('/receiver/{uniqueCode}/{index}/{length}/{base64}')
  public async receivePhotoData(uniqueCode: string, index: number, length: number, base64: string): Promise<string> {
    if (!(uniqueCode in base64Cache)) {
      base64Cache[uniqueCode] = '';
    }

    base64Cache[uniqueCode] += base64;
    console.log(base64Cache[uniqueCode]);

    if (index !== length) {
      return 'received';
    }

    const msg = await photosService.msgOfNewPhoto(
      uniqueCode,
      process.env.SERVER_HOST || 'tmp.cow.kit-victims.org',
      base64Cache[uniqueCode]
    );
    base64Cache[uniqueCode] = null; // GC
    await lineClient.pushMessage(msg.destinationId, msg.msg);
    return 'received';
  }
}
