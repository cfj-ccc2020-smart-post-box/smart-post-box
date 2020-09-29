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
      type: new MsgTypeText(/^(SignUp|登録|開始|スタート)$/),
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: 'この操作は DM でのみ可能です。',
        });
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
      type: new MsgTypeText(/^アカウントの停止をします。$/),
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: 'この操作は DM でのみ可能です。',
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
      type: new MsgTypeText(/^本当にアカウントの停止をします。$/),
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: 'この操作は DM でのみ可能です。',
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, this.confirmAddingNewMachine('DM'));
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加をします。$/),
      source: {
        type: 'group',
      },
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, this.confirmAddingNewMachine('グループ'));
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加をします。$/),
      source: {
        type: 'room',
      },
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, this.confirmAddingNewMachine('ルーム'));
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加を続行します。$/),
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenAddedMachine({
          lineId: event.source.userId,
          destinationType: event.source.type,
          destinationId: event.source[event.source.type + 'Id'],
        });
        lineClient.replyMessage(event.replyToken, msg);
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の設定をします。$/),
      task: async (event) => {
        lineClient.replyMessage(event.replyToken, {
          type: 'template',
          altText: '【ポスト観測機の設定】',
          template: {
            type: 'buttons',
            text: '【ポスト観測機の設定】',
            actions: [
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
              {
                type: 'message',
                label: '停止',
                text: 'ポスト観測機の停止をします。',
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の停止をします。$/),
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

  private confirmAddingNewMachine(destinationType: 'DM' | 'グループ' | 'ルーム'): line.TemplateMessage {
    return {
      type: 'template',
      altText: `観測機からこの ${destinationType} へ通知が行われます。\n支障ありませんか。`,
      template: {
        type: 'confirm',
        text: `観測機からこの ${destinationType} へ通知が行われます。\n支障ありませんか。`,
        actions: [
          {
            type: 'message',
            label: 'ない',
            text: 'ポスト観測機の追加を続行します。',
          },
          {
            type: 'message',
            label: 'キャンセル',
            text: '観測機の追加をキャンセルします。',
          },
        ],
      },
    };
  }
}
