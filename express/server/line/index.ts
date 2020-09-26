import * as line from '@line/bot-sdk';
import { MsgTypeText } from './interface';
import { LineEvRoutingHelper } from './helper';
import { UsersLinesModel } from '../api/models/users-lines.model';
import { UsersLinesService } from '../api/services/users-lines.service';

const lineEvRoutingHelper = new LineEvRoutingHelper();

export class LineEvRouter {
  constructor(config: line.ClientConfig) {
    const lineClient: line.Client = new line.Client(config);
    const usersLinesModel = new UsersLinesModel(lineClient);
    const usersLinesService = new UsersLinesService(usersLinesModel);

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^SignUp|登録$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenSingUpUser(event);
        lineClient.pushMessage(event.source.userId, {
          type: 'text',
          text: msg,
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^Close|退会$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenClosingUser(event);
        lineClient.pushMessage(event.source.userId, {
          type: 'text',
          text: msg,
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^(Email|メール) [\w\-._]+@[\w\-._]+\.[A-Za-z]+$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        // TODO: Coming soon...
        const msg = 'Coming soon...'; // await usersLinesService.replyMsgWhenAddingEmail(event);
        lineClient.pushMessage(event.source.userId, {
          type: 'text',
          text: msg,
        });
      },
    });
  }

  public async hears(event: line.WebhookEvent): Promise<void> {
    return lineEvRoutingHelper.hears(event);
  }
}
