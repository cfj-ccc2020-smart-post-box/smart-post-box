import { Controller, Get, Route } from 'tsoa';
import { PhotosService } from '../../services/photos.service';

const photosService = new PhotosService({
  lineClientConfig: {
    channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
    channelSecret: process.env.LINE_CH_SECRET.toString(),
  },
});

@Route('photos')
export class PhotosController extends Controller {
  @Get('/last-title/{uniqueCode}')
  public receiveNotification(uniqueCode: string): string {
    photosService.sendMsgOfNewMail(uniqueCode);
    return 'received';
  }
}
