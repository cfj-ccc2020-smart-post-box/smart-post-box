import L from '../../common/logger';
import { UsersLinesModel } from '../models/users-lines.model';
import { UsersLinesEntity } from '../entities/users-lines.entity';
import { MachinesModel } from '../models/machines.model';
import { MachinesEntity } from '../entities/machines.entity';
import * as line from '@line/bot-sdk';

export class UsersLinesService {
  readonly usersLinesModel: UsersLinesModel;
  readonly machinesModel: MachinesModel;

  readonly topMenuTemp: line.TemplateMessage = {
    type: 'template',
    altText: '【トップメニュー】',
    template: {
      type: 'buttons',
      text: '【トップメニュー】\n※「メニュー」と送信し表示',
      actions: [
        {
          type: 'message',
          label: 'ポスト観測機の追加',
          text: 'ポスト観測機の追加をします。',
        },
        {
          type: 'message',
          label: 'ポスト観測機の設定',
          text: 'ポスト観測機の設定をします。',
        },
        {
          type: 'uri',
          label: 'HP・ライセンス',
          uri: 'https://example.com',
        },
        {
          type: 'message',
          label: 'アカウントの停止',
          text: 'アカウントの停止をします。',
        },
      ],
    },
  };

  readonly backToMenu: line.QuickReply = {
    items: [
      {
        type: 'action',
        imageUrl: 'https://img.icons8.com/android/72/menu.png',
        action: {
          type: 'message',
          label: 'メニュー',
          text: 'メニュー',
        },
      },
    ],
  };

  private getTopMenuTempForCreatedUser(created: Date): line.TemplateMessage {
    const temp = this.topMenuTemp;
    const addingMsg = `\n\nスマートポストボックスアカウントの登録は ${created} に完了しました。`;
    temp.altText += addingMsg;
    temp.template['text'] += addingMsg;
    return temp;
  }

  constructor(usersLinesModel: UsersLinesModel) {
    this.usersLinesModel = usersLinesModel;
    this.machinesModel = new MachinesModel();
  }

  public async replyMsgWhenSingUpUser(event: {
    source: { userId: string };
  }): Promise<line.TextMessage | line.TemplateMessage> {
    L.info('replyMsgWhenSingUpUser');

    let createdUser: UsersLinesEntity;
    let replyMsg: line.TextMessage | line.TemplateMessage;

    try {
      createdUser = await this.usersLinesModel.createNewUserFromLine(event.source.userId);
      replyMsg = this.getTopMenuTempForCreatedUser(createdUser.created);
    } catch (err) {
      L.info(err);
      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスアカウントの登録に失敗しました... ><',
        quickReply: this.backToMenu,
      } as line.TextMessage;
    }

    return replyMsg;
  }

  public async replyMsgWhenClosingUser(event: { source: { userId: string } }): Promise<string> {
    L.info('replyMsgWhenClosingUser');

    let closedUser: UsersLinesEntity;
    let replyMsg: string;

    try {
      closedUser = await this.usersLinesModel.closeUserFromLine(event.source.userId);

      if (closedUser) {
        replyMsg = `スマートポストボックスアカウントの停止が完了しました。 日時: ${closedUser.updated}`;
      } else {
        replyMsg = '登録されていない LINE アカウントのため、スマートポストボックスアカウントの停止に失敗しました。';
      }
    } catch (err) {
      L.info(err);
      replyMsg = '何だかの事情でスマートポストボックスアカウントの登録に失敗しました... ><';
    }

    return replyMsg;
  }

  public async getUsersList(): Promise<{ name: string; iconUrl: string }[]> {
    L.info('getUsersList');

    let users: UsersLinesEntity[];

    try {
      users = await this.usersLinesModel.getUsersList();
    } catch (err) {
      throw new Error(err);
    }

    const convertedType = users.map((user) => {
      return {
        name: user.name,
        iconUrl: user.iconUrl,
      };
    });

    return convertedType;
  }

  public async replyMsgWhenAddedMachine(ops: {
    lineId: string;
    destinationType: string;
    destinationId: string;
  }): Promise<line.TextMessage> {
    L.info('replyMsgWhenAddedMachine');

    let user: UsersLinesEntity;
    let machine: MachinesEntity;
    let replyMsg: line.TextMessage;

    try {
      user = await this.usersLinesModel.getUserByLineId(ops.lineId);

      if (!user) {
        replyMsg = {
          type: 'text',
          text: '登録されていない LINE アカウントのため、スマートポストボックスの観測機の追加に失敗しました。',
          quickReply: this.backToMenu,
        };

        return replyMsg;
      }
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスの観測機の追加に失敗しました... ><',
        quickReply: this.backToMenu,
      };

      return replyMsg;
    }

    try {
      machine = await this.machinesModel.addNewMachine({
        usersLinesId: user.id,
        destinationType: ops.destinationType,
        destinationId: ops.destinationId,
      });

      replyMsg = {
        type: 'text',
        text: `【スマートポストボックスの観測機の追加完了】\n\n合言葉『${machine.uniqueCode}』\n\n上記をスマートポストボックスの観測機に設定することで通知が送られるようになります。\n詳しくは「メニュー」から「ホームページ」をご確認下さると幸いです。\nこのメッセージをまるごとコピーしておきましょう。`,
        quickReply: this.backToMenu,
      };
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスの観測機の追加に失敗しました... ><',
        quickReply: this.backToMenu,
      };
    }

    return replyMsg;
  }

  public async replyMsgWhenUsingConfUI(lineId: string): Promise<line.TextMessage | line.FlexMessage> {
    L.info('replyMsgWhenUsingConfUI');

    let user: UsersLinesEntity;
    let machines: MachinesEntity[];
    let replyMsg: line.TextMessage | line.FlexMessage;

    try {
      user = await this.usersLinesModel.getUserByLineId(lineId);

      if (!user) {
        replyMsg = {
          type: 'text',
          text: '登録されていない LINE アカウントのため、スマートポストボックスの観測機の設定を開始できません。',
          quickReply: this.backToMenu,
        };

        return replyMsg;
      }
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスの観測機の設定を開始できません... ><',
        quickReply: this.backToMenu,
      };

      return replyMsg;
    }

    try {
      machines = await this.machinesModel.getMachinesByUsersLineId(user.id);

      if (machines.length === 0) {
        replyMsg = {
          type: 'text',
          text:
            'アカウントに登録されたポスト観測機がありません。\n\n「メニュー」から「ポスト観測機の追加」を行って下さい。',
          quickReply: this.backToMenu,
        };

        return replyMsg;
      }

      const flexBubbles = machines
        .filter((machine: MachinesEntity): boolean => !machine.stop)
        .map(
          (machine: MachinesEntity): line.FlexBubble => {
            return {
              type: 'bubble',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'ID: ' + machine.uniqueCode,
                  },
                  {
                    type: 'text',
                    text: `Name: ${machine.name || 'No name'}`,
                  },
                  {
                    type: 'text',
                    text: `同期: ${machine.synced ? '済' : '未'}`,
                  },
                  {
                    type: 'text',
                    text: `Model: ${machine.modelName || 'Unknown'}`,
                  },
                  {
                    type: 'text',
                    text: `状態: ${machine.stop ? '停止' : '稼働'}中`,
                  },
                  {
                    type: 'text',
                    text: `定期撮影: ${machine.takePhoto ? '有効' : '停止中'}又は撮影機能非搭載`,
                  },
                  {
                    type: 'text',
                    text: `定期頻度: ${machine.cron} 分毎`,
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
                      text: 'ポスト観測機『' + machine.uniqueCode + '』の設定を開始します。',
                    },
                  },
                ],
              },
            };
          }
        )
        .concat(
          machines
            .filter((machine: MachinesEntity): boolean => machine.stop)
            .map(
              (machine: MachinesEntity): line.FlexBubble => {
                return {
                  type: 'bubble',
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: 'ID: ' + machine.uniqueCode,
                      },
                      {
                        type: 'text',
                        text: `Name: ${machine.name || 'No name'}`,
                      },
                      {
                        type: 'text',
                        text: `同期: ${machine.synced ? '済' : '未'}`,
                      },
                      {
                        type: 'text',
                        text: `Model: ${machine.modelName || 'Unknown'}`,
                      },
                      {
                        type: 'text',
                        text: `状態: ${machine.stop ? '停止' : '稼働'}中`,
                      },
                      {
                        type: 'text',
                        text: `定期撮影: ${machine.takePhoto ? '有効' : '停止中'}又は撮影機能非搭載`,
                      },
                      {
                        type: 'text',
                        text: `定期頻度: ${machine.cron} 分毎`,
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
                          text: '停止中ポスト観測機『' + machine.uniqueCode + '』の設定を開始します。',
                        },
                      },
                      {
                        type: 'text',
                        text: '登録解除',
                        action: {
                          type: 'message',
                          label: 'action',
                          text: 'ポスト観測機『' + machine.uniqueCode + '』の登録解除をします。',
                        },
                      },
                    ],
                  },
                };
              }
            )
        );

      replyMsg = {
        type: 'flex',
        altText: '設定するポスト観測機を選択して下さい。',
        contents: {
          type: 'carousel',
          contents: flexBubbles,
        },
      };
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスの観測機の設定を開始できません... ><',
        quickReply: this.backToMenu,
      };
    }

    return replyMsg;
  }

  public async replyMsgWhenStopMachine(lineId: string, uniqueCode: string): Promise<line.TextMessage> {
    L.info('replyMsgWhenStopMachine');

    let user: UsersLinesEntity;
    let replyMsg: line.TextMessage;

    try {
      user = await this.usersLinesModel.getUserByLineId(lineId);

      if (!user) {
        replyMsg = {
          type: 'text',
          text: '登録されていない LINE アカウントのため、スマートポストボックスの観測機の停止を開始できません。',
          quickReply: this.backToMenu,
        };

        return replyMsg;
      }
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスの観測機の停止を開始できません... ><',
        quickReply: this.backToMenu,
      };

      return replyMsg;
    }

    try {
      const isOwner = await this.machinesModel.isOwnerOfThisMachine(user.id, uniqueCode);

      if (!isOwner) {
        replyMsg = {
          type: 'text',
          text:
            '選択されたポスト観測機か存在しない、或いは現在のアカウントが所収者ではないため、ポスト観測機の停止を完了できませんでした。',
          quickReply: this.backToMenu,
        };

        return replyMsg;
      }
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスの観測機の停止を開始できません... ><',
        quickReply: this.backToMenu,
      };

      return replyMsg;
    }

    try {
      await this.machinesModel.stopMachine(uniqueCode);

      replyMsg = {
        type: 'text',
        text: 'スマートポストボックスの観測機の停止が完了しました。',
        quickReply: this.backToMenu,
      };
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマートポストボックスの観測機の停止を開始できません... ><',
        quickReply: this.backToMenu,
      };
    }

    return replyMsg;
  }
}
