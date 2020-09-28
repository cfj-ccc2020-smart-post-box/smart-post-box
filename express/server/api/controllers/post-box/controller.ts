import { Controller, Get, Route } from 'tsoa';
import { PostBoxService } from '../../services/post-box.service';

const postBoxService = new PostBoxService({
  lineClientConfig: {
    channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
    channelSecret: process.env.LINE_CH_SECRET.toString(),
  },
});

@Route('post-box')
export class PostBoxController extends Controller {
  @Get('/receiver/{uniqueCode}')
  public receiveNotification(uniqueCode: string): string {
    postBoxService.sendMsgOfNewMail(uniqueCode);
    return 'received';
  }
}
