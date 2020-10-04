import { Controller, Get, Post, Route } from 'tsoa';
import { PostBoxService } from '../../services/post-box.service';
import * as line from '@line/bot-sdk';

const postBoxService = new PostBoxService();
const lineClient = new line.Client({
  channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
  channelSecret: process.env.LINE_CH_SECRET.toString(),
});

@Route('post-box')
export class PostBoxController extends Controller {
  @Get('/receiver/{uniqueCode}')
  public async receiveNotification(uniqueCode: string): Promise<string> {
    const msg = await postBoxService.msgOfNewMail(uniqueCode);
    lineClient.pushMessage(msg.destinationId, msg.msg);
    return 'received';
  }

  @Post('/sync/{uniqueCode}/{modelName}/{isCamera}')
  public async sync(uniqueCode: string, modelName: string, isCamera: 'true' | 'false'): Promise<string> {
    
    return ''; //await postBoxService.cron
  }
}
