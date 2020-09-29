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

  private getTopMenuTempForCreatedUser(created: Date): line.TemplateMessage {
    const temp = this.topMenuTemp;
    const addingMsg = `\n\nスマポートポストボックスアカウントの登録は ${created} に完了しました。`;
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
        text: '何だかの事情でスマポートポストボックスアカウントの登録に失敗しました... ><',
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
        replyMsg = `スマポートポストボックスアカウントの停止が完了しました。 日時: ${closedUser.updated}`;
      } else {
        replyMsg = '登録されていない LINE アカウントのため、スマポートポストボックスアカウントの停止に失敗しました。';
      }
    } catch (err) {
      L.info(err);
      replyMsg = '何だかの事情でスマポートポストボックスアカウントの登録に失敗しました... ><';
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
          text: '登録されていない LINE アカウントのため、スマポートポストボックスの観測機の追加に失敗しました。',
        };

        return replyMsg;
      }
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマポートポストボックスの観測機の追加に失敗しました... ><',
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
        text: `【スマポートポストボックスの観測機の追加完了】\n\n合言葉『${machine.uniqueCode}』\n\n上記をスマポートポストボックスの観測機に設定することで通知が送られるようになります。\n詳しくは「メニュー」から「ホームページ」をご確認下さると幸いです。\nこのメッセージをまるごとコピーしておきましょう。`,
      };
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマポートポストボックスの観測機の追加に失敗しました... ><',
      };
    }

    return replyMsg;
  }

  public async replyMsgWhenUsingConfUI(lineId: string): Promise<line.TextMessage> {
    L.info('replyMsgWhenUsingConfUI');

    let user: UsersLinesEntity;
    let machines: MachinesEntity[];
    let replyMsg: line.TextMessage;

    try {
      user = await this.usersLinesModel.getUserByLineId(lineId);

      if (!user) {
        replyMsg = {
          type: 'text',
          text: '登録されていない LINE アカウントのため、スマポートポストボックスの観測機の設定を開始できません。',
        };

        return replyMsg;
      }
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマポートポストボックスの観測機の設定を開始できません... ><',
      };

      return replyMsg;
    }

    try {
      machines = await this.machinesModel.getMachinesByUsersLineId(user.id);

      if (machines.length === 0) {
        replyMsg = {
          type: 'text',
          text: 'アカウントに登録された端末がありません。\n\n「メニュー」から「ポスト観測機の追加」を行って下さい。',
        };

        return replyMsg;
      }

      const items = machines.map(
        (machine: MachinesEntity): line.QuickReplyItem => {
          return {
            type: 'action',
            imageUrl: 'https://img.icons8.com/ios-glyphs/72/mailbox-closed-flag-up.png',
            action: {
              type: 'message',
              label: machine.name === '' ? machine.uniqueCode : `${machine.name}: ${machine.uniqueCode}`,
              text: 'ポスト観測機『' + machine.uniqueCode + '』の設定を開始します。',
            },
          };
        }
      );

      replyMsg = {
        type: 'text',
        text: '設定するポスト観測機を選択して下さい。\n\n※選択ボタンはスマートフォンで閲覧できます。',
        quickReply: {
          items,
        },
      };
    } catch (err) {
      L.info(err);

      replyMsg = {
        type: 'text',
        text: '何だかの事情でスマポートポストボックスの観測機の設定を開始できません... ><',
      };
    }

    return replyMsg;
  }
}
