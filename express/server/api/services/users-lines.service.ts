import L from '../../common/logger';
import { UsersLinesModel } from '../models/users-lines.model';
import { UsersLinesEntity } from '../entities/users-lines.entity';

export class UsersLinesService {
  readonly usersLinesModel: UsersLinesModel;

  constructor(usersLinesModel: UsersLinesModel) {
    this.usersLinesModel = usersLinesModel;
  }

  public async replyMsgWhenSingUpUser(event: { source: { userId: string } }): Promise<string> {
    L.info('replyMsgWhenSingUpUser');

    let createdUser: UsersLinesEntity;
    let replyMsg: string;

    try {
      createdUser = await this.usersLinesModel.createNewUserFromLine(event.source.userId);
      replyMsg = `Your account was created successfully! when ${createdUser.created}`;
    } catch (err) {
      L.info(err);
      replyMsg = 'Error: somethings is wrong. ><';
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
        replyMsg = `Your account was closed successfully! when ${closedUser.updated}`;
      } else {
        replyMsg = 'Your account is not found...';
      }
    } catch (err) {
      L.info(err);
      replyMsg = 'Error: somethings is wrong. ><';
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
