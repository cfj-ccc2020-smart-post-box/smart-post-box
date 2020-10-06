import * as line from '@line/bot-sdk';
import { MsgTypeText } from './interface';
import { LineEvRoutingHelper } from './helper';
import { UsersLinesModel } from '../api/models/users-lines.model';
import { UsersLinesService } from '../api/services/users-lines.service';

const lineEvRoutingHelper = new LineEvRoutingHelper();

export class LineEvRouter {
  readonly lineClient: line.Client;
  readonly backToMenu: line.QuickReply;

  constructor(config: line.ClientConfig) {
    this.lineClient = new line.Client(config);
    const usersLinesModel = new UsersLinesModel(this.lineClient);
    const usersLinesService = new UsersLinesService(usersLinesModel);
    this.backToMenu = usersLinesService.backToMenu;

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
          quickReply: {
            items: [
              {
                type: 'action',
                imageUrl: 'https://img.icons8.com/ios-filled/72/approve-and-update.png',
                action: {
                  type: 'message',
                  label: '当アカウントの再開',
                  text: 'スタート',
                },
              },
            ],
          },
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
        this.lineClient.replyMessage(event.replyToken, msg);
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
                label: '停止',
                text: `ポスト観測機『${uniqueCode}』の停止をします。`,
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
      type: new MsgTypeText(/^停止中ポスト観測機『.+』の設定を開始します。$/),
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
                label: '再稼働',
                text: `停止中ポスト観測機『${uniqueCode}』の再稼働をします。`,
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^停止中ポスト観測機『.+』の再稼働をします。$/),
      source: {
        type: 'user',
      },
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken), // TODO: develop!!!
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^停止中ポスト観測機『.+』の再稼働をします。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^停止中ポスト観測機『.+』の設定を開始します。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機『.+』の登録解除をします。$/),
      source: {
        type: 'user',
      },
      task: (event) => {
        const uniqueCode = event.message.text.split(/『|』/)[1];

        this.lineClient.replyMessage(event.replyToken, {
          type: 'template',
          altText: '本当にポスト観測機の登録解除をしますか。',
          template: {
            type: 'confirm',
            text:
              '本当にポスト観測機の登録解除をしますか。\n\n※投函されても通知が行われなくなります。\n※観測機に登録された『合言葉』も無効になります。',
            actions: [
              {
                type: 'message',
                label: 'はい',
                text: `本当にポスト観測機『${uniqueCode}』の登録解除をします。`,
              },
              {
                type: 'message',
                label: 'いいえ',
                text: 'ポスト観測機の登録解除をキャンセルします。',
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機『.+』の登録解除をします。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^本当にポスト観測機『.+』の登録解除をします。$/),
      source: {
        type: 'user',
      },
      task: async (/* event */) => {
        // const uniqueCode = event.message.text.split(/『|』/)[1];
        // TODO: develop!!!
        // const msg = await usersLinesService.replyMsgWhenStopMachine(event.source.userId, uniqueCode);

        // this.lineClient.replyMessage(event.replyToken, msg);

        return;
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^本当にポスト観測機『.+』の登録解除をします。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機『.+』の停止をします。$/),
      source: {
        type: 'user',
      },
      task: (event) => {
        const uniqueCode = event.message.text.split(/『|』/)[1];

        this.lineClient.replyMessage(event.replyToken, {
          type: 'template',
          altText: '本当にポスト観測機の停止をしますか。',
          template: {
            type: 'confirm',
            text: '本当にポスト観測機の停止をしますか。\n\n※投函されても通知が行われなくなります。',
            actions: [
              {
                type: 'message',
                label: 'はい',
                text: `本当にポスト観測機『${uniqueCode}』の停止をします。`,
              },
              {
                type: 'message',
                label: 'いいえ',
                text: 'ポスト観測機の停止をキャンセルします。',
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機『.+』の停止をします。$/),
      task: async (event) => this.replyMsgOfOnlyDM(event.replyToken),
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^本当にポスト観測機『.+』の停止をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const uniqueCode = event.message.text.split(/『|』/)[1];

        const msg = await usersLinesService.replyMsgWhenStopMachine(event.source.userId, uniqueCode);

        this.lineClient.replyMessage(event.replyToken, msg);
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^本当にポスト観測機『.+』の停止をします。$/),
      task: (event) => this.replyMsgOfOnlyDM(event.replyToken),
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
      type: new MsgTypeText(/^ポスト観測機『.+』の撮影頻度の変更をします。$/),
      source: {
        type: 'user',
      },
      task: async (event) => {
        const uniqueCode = event.message.text.split(/『|』/)[1];

        this.lineClient.replyMessage(event.replyToken, {
          type: 'flex',
          altText: '撮影頻度を選択して下さい。',
          contents: {
            type: 'carousel',
            contents: [
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '定期撮影を行わない。',
                    },
                  ],
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選択',
                      action: {
                        type: 'message',
                        label: 'action',
                        text: 'ポスト観測機『' + uniqueCode + '』の定期撮影を停止します。',
                      },
                    },
                  ],
                },
              },
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '30分毎',
                    },
                  ],
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選択',
                      action: {
                        type: 'message',
                        label: 'action',
                        text: 'ポスト観測機『' + uniqueCode + '』の定期撮影を30分毎へ設定します。',
                      },
                    },
                  ],
                },
              },
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '180分毎 (03時間)',
                    },
                  ],
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選択',
                      action: {
                        type: 'message',
                        label: 'action',
                        text: 'ポスト観測機『' + uniqueCode + '』の定期撮影を180分毎へ設定します。',
                      },
                    },
                  ],
                },
              },
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '360分毎 (半日)',
                    },
                  ],
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選択',
                      action: {
                        type: 'message',
                        label: 'action',
                        text: 'ポスト観測機『' + uniqueCode + '』の定期撮影を360分毎へ設定します。',
                      },
                    },
                  ],
                },
              },
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '720分毎 (01日)',
                    },
                  ],
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選択',
                      action: {
                        type: 'message',
                        label: 'action',
                        text: 'ポスト観測機『' + uniqueCode + '』の定期撮影を720分毎へ設定します。',
                      },
                    },
                  ],
                },
              },
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '2160分毎 (03日)',
                    },
                  ],
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選択',
                      action: {
                        type: 'message',
                        label: 'action',
                        text: 'ポスト観測機『' + uniqueCode + '』の定期撮影を2160分毎へ設定します。',
                      },
                    },
                  ],
                },
              },
              {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '5040分毎 (一週間)',
                    },
                  ],
                },
                footer: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: '選択',
                      action: {
                        type: 'message',
                        label: 'action',
                        text: 'ポスト観測機『' + uniqueCode + '』の定期撮影を5040分毎へ設定します。',
                      },
                    },
                  ],
                },
              },
            ],
          },
        });
      },
    });

    lineEvRoutingHelper.msgEv({
      type: new MsgTypeText(/^ポスト観測機『.+』の撮影頻度の変更をします。$/),
      task: async (event) => this.replyMsgOfOnlyDM(event.replyToken),
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
      quickReply: this.backToMenu,
    });
  }
}
