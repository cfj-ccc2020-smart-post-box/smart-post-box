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
      type: new MsgTypeText(/^(SignUp|登録|開始|スタート)$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenSingUpUser(event);
        lineClient.replyMessage(event.replyToken, msg);
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^メニュー$/),
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, usersLinesService.topMenuTemp);
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^アカウントの停止をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, {
          type: 'template',
          altText: '本当にアカウントの停止をしますか。',
          template: {
            type: 'confirm',
            text: '本当にアカウントの停止をしますか。',
            actions: [
              {
                type: 'message',
                label: 'はい',
                text: '本当にアカウントの停止をします。',
              },
              {
                type: 'message',
                label: 'いいえ',
                text: 'アカウントの停止をキャンセルします。',
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^本当にアカウントの停止をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenClosingUser(event);
        lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: msg,
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加や設定をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, {
          type: 'template',
          altText: '【ポスト観測機の追加や設定】',
          template: {
            type: 'buttons',
            text: '【ポスト観測機の追加や設定】',
            actions: [
              {
                type: 'message',
                label: '追加・停止',
                text: 'ポスト観測機の追加・停止をします。',
              },
              {
                type: 'message',
                label: '名前変更',
                text: 'ポスト観測機の名前変更をします。',
              },
              {
                type: 'message',
                label: '合言葉更新',
                text: 'ポスト観測機の合言葉更新をします。',
              },
              {
                type: 'message',
                label: '撮影頻度の変更',
                text: 'ポスト観測機の撮影頻度の変更をします。',
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加・停止をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // lineClient.replyMessage(event.replyToken, {});
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の名前変更をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // lineClient.replyMessage(event.replyToken, {});
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の合言葉更新をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // lineClient.replyMessage(event.replyToken, {});
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の撮影頻度の変更をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // lineClient.replyMessage(event.replyToken, {});
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
