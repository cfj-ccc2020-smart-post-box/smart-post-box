import { Controller, Get, Post, Route, Body } from 'tsoa';
import { PhotosService } from '../../services/photos.service';
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
  public async foo(uniqueCode: string, @Body() body: { photoBase64: string }): Promise<string> {
    const msg = await photosService.msgOfNewPhoto(
      uniqueCode,
      process.env.SERVER_HOST || 'tmp.cow.kit-victims.org',
      body.photoBase64
    );
    await lineClient.pushMessage(msg.destinationId, msg.msg);
    return 'received';
  }
}
