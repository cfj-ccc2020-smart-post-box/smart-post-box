import '../../common/env.ts';
import * as line from '@line/bot-sdk';
import { UsersLinesService } from '../../api/services/users-lines.service';
import { UsersLinesModel } from '../../api/models/users-lines.model';
import { getRepository } from 'typeorm';
import { UsersLinesEntity } from '../../api/entities/users-lines.entity';
import { expressServer } from '../../common/server';

const lineClient: line.Client = new line.Client({
  channelAccessToken: 'test',
  channelSecret: 'test',
});
const usersLinesModel = new UsersLinesModel(lineClient);
const usersLinesService = new UsersLinesService(usersLinesModel);

const lineId = 'test line id';

describe('UsersLinesService', () => {
  beforeEach(async () => {
    await expressServer.connectToDB();
    const usersLinesRepository = getRepository(UsersLinesEntity);

    const newUser = usersLinesRepository.create({
      lineId,
      name: 'Test User',
      iconUrl: 'https://thispersondoesnotexist.com/image',
      linked: true,
    });

    await usersLinesRepository.save(newUser);
  });

  afterEach(async () => {
    const usersLinesRepository = getRepository(UsersLinesEntity);
    await usersLinesRepository.delete({ lineId });

    await expressServer.closeDbConnection();
  });

  it('If visitor already has account, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenSingUpUser({ source: { userId: lineId } });
    expect(replyMsg['altText'].indexOf('スマートポストボックスアカウントの登録は') !== -1).toBe(true);
  });

  it('If user requested to close the account, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenClosingUser({ source: { userId: lineId } });
    expect(replyMsg.indexOf('スマートポストボックスアカウントの停止が完了しました。 日時: ')).toBe(0);
  });

  it('If unknown user requested to close the account, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenClosingUser({ source: { userId: 'unknown' } });
    expect(replyMsg).toBe(
      '登録されていない LINE アカウントのため、スマートポストボックスアカウントの停止に失敗しました。'
    );
  });
});
