import L from '../../common/logger';
import { UsersLinesModel } from '../models/users-lines.model';
import { UsersLinesEntity } from '../entities/users-lines.entity';
import * as line from '@line/bot-sdk';

export class UsersLinesService {
  readonly usersLinesModel: UsersLinesModel;

  readonly topMenuTemp: line.TemplateMessage = {
    type: 'template',
    altText: '【トップメニュー】',
    template: {
      type: 'buttons',
      text: '【トップメニュー】\n※「メニュー」と送信し表示',
      actions: [
        {
          type: 'message',
          label: 'ポスト観測機の追加や設定',
          text: 'ポスト観測機の追加や設定をします。',
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
}
