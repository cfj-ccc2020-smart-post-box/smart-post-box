import * as line from '@line/bot-sdk';
import { MsgTypeText } from './interface';
import { LineEvRoutingHelper } from './helper';
import { UsersLinesModel } from '../api/models/users-lines.model';
import { UsersLinesService } from '../api/services/users-lines.service';
import e from 'express';

const lineEvRoutingHelper = new LineEvRoutingHelper();

export class LineEvRouter {
  readonly lineClient: line.Client;

  constructor(config: line.ClientConfig) {
    this.lineClient = new line.Client(config);
    const usersLinesModel = new UsersLinesModel(this.lineClient);
    const usersLinesService = new UsersLinesService(usersLinesModel);

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^(SignUp|登録|開始|スタート)$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenSingUpUser(event);
        this.lineClient.replyMessage(event.replyToken, msg);
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^(SignUp|登録|開始|スタート)$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^メニュー$/),
      task: (event) => {
        this.lineClient.replyMessage(event.replyToken, usersLinesService.topMenuTemp);
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^アカウントの停止をします。$/),
      source: {
        type: 'user',
      },
      task: (event) => {
        this.lineClient.replyMessage(event.replyToken, {
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
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^本当にアカウントの停止をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenClosingUser(event);
        this.lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: msg,
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^本当にアカウントの停止をします。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加をします。$/),
      source: {
        type: 'user',
      },
      task: (event) => {
        this.lineClient.replyMessage(event.replyToken, this.confirmAddingNewMachine('DM'));
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加をします。$/),
      source: {
        type: 'group',
      },
      task: (event) => {
        this.lineClient.replyMessage(event.replyToken, this.confirmAddingNewMachine('グループ'));
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の追加をします。$/),
      source: {
        type: 'room',
      },
      task: (event) => {
        this.lineClient.replyMessage(event.replyToken, this.confirmAddingNewMachine('ルーム'));
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
        this.lineClient.replyMessage(event.replyToken, msg);
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の設定をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const msg = await usersLinesService.replyMsgWhenUsingConfUI(event.source.userId);
        this.lineClient.replyMessage(event.replyToken, {
          type: 'text',
          text: '設定するポスト観測機を選択して下さい。\n\n※選択ボタンはスマートフォンで閲覧できます。',
          quickReply: {
            items: [
              {
                type: 'action',
                imageUrl: 'https://img.icons8.com/ios-glyphs/72/mailbox-closed-flag-up.png',
                action: {
                  type: 'message',
                  label: 'Tempura',
                  text: 'ポスト観測機『oca17PJc1i2Bd9nur6EVS2』の設定を開始します。',
                },
              },
              {
                type: 'action',
                imageUrl: 'https://example.com/tempura.png',
                action: {
                  type: 'message',
                  label: 'Tempura',
                  text: 'Tempura',
                },
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の設定をします。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機『.+』の設定を開始します。$/),
      source: {
        type: 'user',
      },
      task: (event) => {
        const uniqueCode = event.message.text.split(/『|』/)[1];

        this.lineClient.replyMessage(event.replyToken, {
          type: 'template',
          altText: '【ポスト観測機の設定】',
          template: {
            type: 'buttons',
            text: '【ポスト観測機の設定】',
            actions: [
              {
                type: 'message',
                label: '名前変更',
                text: `ポスト観測機『${uniqueCode}』の名前変更をします。`,
              },
              {
                type: 'message',
                label: '合言葉更新',
                text: `ポスト観測機『${uniqueCode}』の合言葉更新をします。`,
              },
              {
                type: 'message',
                label: '撮影頻度の変更',
                text: `ポスト観測機『${uniqueCode}』の撮影頻度の変更をします。`,
              },
              {
                type: 'message',
                label: '停止・再稼働',
                text: `ポスト観測機『${uniqueCode}』の停止・再稼働をします。`,
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機『.+』の設定を開始します。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の停止をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // this.lineClient.replyMessage(event.replyToken, {});
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の名前変更をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // this.lineClient.replyMessage(event.replyToken, {});
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の合言葉更新をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // this.lineClient.replyMessage(event.replyToken, {});
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機の撮影頻度の変更をします。$/),
      source: {
        type: 'user',
      },
      task: async () => {
        // this.lineClient.replyMessage(event.replyToken, {});
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
        this.lineClient.replyMessage(event.replyToken, {
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

  private replyMsgOfOnlyDM(replyToken: string): void {
    this.lineClient.replyMessage(replyToken, {
      type: 'text',
      text: 'この操作は DM でのみ可能です。',
    });
  }
}
