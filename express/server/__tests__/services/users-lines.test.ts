import * as line from '@line/bot-sdk';
import { UsersLinesService } from '../../api/services/users-lines.service';
import { UsersLinesModel } from '../../api/models/users-lines.model';
import { getRepository, createConnection, Connection } from 'typeorm';
import { UsersLinesEntity } from '../../api/entities/users-lines.entity';
import { MachinesEntity } from '../../api/entities/machines.entity';
import path from 'path';

const lineClient: line.Client = new line.Client({
  channelAccessToken: 'test',
  channelSecret: 'test',
});
const usersLinesModel = new UsersLinesModel(lineClient);
const usersLinesService = new UsersLinesService(usersLinesModel);

const testUserOp = {
  id: 1,
  lineId: 'Test Line ID',
  name: 'Test User',
  iconUrl: 'https://thispersondoesnotexist.com/image',
  linked: true,
};

const testUserOfNotHavingMachineOp = Object.assign({}, testUserOp);
++testUserOfNotHavingMachineOp.id;
testUserOfNotHavingMachineOp.lineId = 'Test Line ID of not having machine';

const testMachineOp = {
  uniqueCode: 'Unique Code',
  usersLinesId: testUserOp.id,
  destinationType: 'user',
  destinationId: 'User Test DM',
};

const testMachineOfSyncedOp = Object.assign({}, testMachineOp);
testMachineOfSyncedOp.uniqueCode = 'Unique Code of Synced';
testMachineOfSyncedOp['synced'] = true;
testMachineOfSyncedOp['modelName'] = 'Test Model of Synced';

const testMachineOfNamedOp = Object.assign({}, testMachineOp);
testMachineOfNamedOp.uniqueCode = 'Unique Code of Named';
testMachineOfNamedOp['name'] = 'Test Machine of Named';

const testMachineOfSyncedNamedOp = Object.assign({}, testMachineOp);
testMachineOfSyncedNamedOp.uniqueCode = 'Unique Code of Synced, Named';
testMachineOfSyncedNamedOp['synced'] = true;
testMachineOfSyncedNamedOp['modelName'] = 'Test Model of Synced, Named';
testMachineOfSyncedNamedOp['name'] = 'Test Machine of Synced, Named';

let connection: Connection;

describe('UsersLinesService', () => {
  beforeEach(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: path.join(__dirname, '..', '..', '..', `db.${__filename.split(/[\\/]services[\\/]|\.ts$/)[1]}.splite`),
      entities: [UsersLinesEntity, MachinesEntity],
      synchronize: true,
    });

    const usersLinesRepository = getRepository(UsersLinesEntity);
    const machinesRepository = getRepository(MachinesEntity);

    await usersLinesRepository.save(usersLinesRepository.create(testUserOp));
    await usersLinesRepository.save(usersLinesRepository.create(testUserOfNotHavingMachineOp));
    await machinesRepository.save(machinesRepository.create(testMachineOp));
    await machinesRepository.save(machinesRepository.create(testMachineOfSyncedOp));
    await machinesRepository.save(machinesRepository.create(testMachineOfNamedOp));
    await machinesRepository.save(machinesRepository.create(testMachineOfSyncedNamedOp));
  });

  afterEach(async () => {
    const usersLinesRepository = getRepository(UsersLinesEntity);
    await usersLinesRepository.delete({ lineId: testUserOp.lineId });
    await usersLinesRepository.delete({ lineId: testUserOfNotHavingMachineOp.lineId });

    const machinesRepository = getRepository(MachinesEntity);
    await machinesRepository.delete({ destinationId: testMachineOp.destinationId });

    await connection.close();
  });

  it('If visitor already has account, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenSingUpUser({
      source: { userId: testUserOp.lineId },
    });
    expect(replyMsg['altText'].indexOf('スマートポストボックスアカウントの登録は') !== -1).toBe(true);
  });

  it('If user requested to close the account, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenClosingUser({ source: { userId: testUserOp.lineId } });
    expect(replyMsg.indexOf('スマートポストボックスアカウントの停止が完了しました。 日時: ')).toBe(0);

    const usersLinesRepository = getRepository(UsersLinesEntity);
    const user = await usersLinesRepository.findOne({ lineId: testUserOp.lineId });

    expect(user.using).toBe(false);
  });

  it('If unknown user requested to close the account, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenClosingUser({ source: { userId: 'unknown' } });
    expect(replyMsg).toBe(
      '登録されていない LINE アカウントのため、スマートポストボックスアカウントの停止に失敗しました。'
    );
  });

  it('If there is a user, return one elm arr than it has name, iconUrl', async () => {
    const users = await usersLinesService.getUsersList();

    expect(users.length).toBe(2);
    expect(users[0].name).toBe(testUserOp.name);
    expect(users[0].iconUrl).toBe(testUserOp.iconUrl);
  });

  it('If unknown user want to stop a machine, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenStopMachine('unknown', testMachineOp.uniqueCode);

    expect(replyMsg.type).toBe('text');
    expect(replyMsg.text).toBe(
      '登録されていない LINE アカウントのため、スマートポストボックスの観測機の停止を開始できません。'
    );
  });

  it('If the user want to stop a unknown machine, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenStopMachine(testUserOp.lineId, 'unknown');

    expect(replyMsg.type).toBe('text');
    expect(replyMsg.text).toBe(
      '選択されたポスト観測機か存在しない、或いは現在のアカウントが所収者ではないため、ポスト観測機の停止を完了できませんでした。'
    );
  });

  it('If the user want to stop users machine, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenStopMachine(testUserOp.lineId, testMachineOp.uniqueCode);

    expect(replyMsg.type).toBe('text');
    expect(replyMsg.text).toBe('スマートポストボックスの観測機の停止が完了しました。');

    const machinesRepository = getRepository(MachinesEntity);
    const machine = await machinesRepository.findOne({ uniqueCode: testMachineOp.uniqueCode });

    expect(machine.stop).toBe(true);
  });

  it('If the user want to use config UI, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenUsingConfUI(testUserOp.lineId);

    expect(replyMsg.type).toBe('flex');
    expect(replyMsg['altText']).toBe('設定するポスト観測機を選択して下さい。');
    expect(replyMsg['contents']['contents'].length).toBe(4);

    expect(replyMsg['contents']['contents'][0]['body']['contents'][0]['text']).toBe('ID: ' + testMachineOp.uniqueCode);
    expect(replyMsg['contents']['contents'][0]['body']['contents'][1]['text']).toBe('Name: No name');
    expect(replyMsg['contents']['contents'][0]['body']['contents'][2]['text']).toBe('同期: 未');
    expect(replyMsg['contents']['contents'][0]['body']['contents'][3]['text']).toBe('Model: Unknown');

    expect(replyMsg['contents']['contents'][1]['body']['contents'][0]['text']).toBe(
      'ID: ' + testMachineOfSyncedOp.uniqueCode
    );
    expect(replyMsg['contents']['contents'][1]['body']['contents'][1]['text']).toBe('Name: No name');
    expect(replyMsg['contents']['contents'][1]['body']['contents'][2]['text']).toBe('同期: 済');
    expect(replyMsg['contents']['contents'][1]['body']['contents'][3]['text']).toBe(
      'Model: ' + testMachineOfSyncedOp['modelName']
    );

    expect(replyMsg['contents']['contents'][2]['body']['contents'][0]['text']).toBe(
      'ID: ' + testMachineOfNamedOp.uniqueCode
    );
    expect(replyMsg['contents']['contents'][2]['body']['contents'][1]['text']).toBe(
      'Name: ' + testMachineOfNamedOp['name']
    );
    expect(replyMsg['contents']['contents'][2]['body']['contents'][2]['text']).toBe('同期: 未');
    expect(replyMsg['contents']['contents'][2]['body']['contents'][3]['text']).toBe('Model: Unknown');

    expect(replyMsg['contents']['contents'][3]['body']['contents'][0]['text']).toBe(
      'ID: ' + testMachineOfSyncedNamedOp.uniqueCode
    );
    expect(replyMsg['contents']['contents'][3]['body']['contents'][1]['text']).toBe(
      'Name: ' + testMachineOfSyncedNamedOp['name']
    );
    expect(replyMsg['contents']['contents'][3]['body']['contents'][2]['text']).toBe('同期: 済');
    expect(replyMsg['contents']['contents'][3]['body']['contents'][3]['text']).toBe(
      'Model: ' + testMachineOfSyncedNamedOp['modelName']
    );
  });

  it('If unknown user want to add new machine, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenAddedMachine({
      lineId: 'unknown',
      destinationType: testMachineOp.destinationType,
      destinationId: testMachineOp.destinationId,
    });

    expect(replyMsg.type).toBe('text');
    expect(replyMsg.text).toBe(
      '登録されていない LINE アカウントのため、スマートポストボックスの観測機の追加に失敗しました。'
    );
  });

  it('If the user want to add new machine, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenAddedMachine({
      lineId: testUserOp.lineId,
      destinationType: testMachineOp.destinationType,
      destinationId: testMachineOp.destinationId,
    });

    expect(replyMsg.type).toBe('text');
    expect(replyMsg.text.indexOf('【スマートポストボックスの観測機の追加完了】\n\n合言葉『')).toBe(0);

    const machineUniqueCode = replyMsg.text.split(/『|』/)[1];
    const machinesRepository = getRepository(MachinesEntity);
    const machine = await machinesRepository.findOne({ uniqueCode: machineUniqueCode });

    expect(machine.destinationId).toBe(testMachineOp.destinationId);
  });

  it('If unknown user want to use config UI, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenUsingConfUI('unknown');

    expect(replyMsg.type).toBe('text');
    expect(replyMsg['text']).toBe(
      '登録されていない LINE アカウントのため、スマートポストボックスの観測機の設定を開始できません。'
    );
  });

  it('If the user of not having the machine want to use config UI, It will reply this.', async () => {
    const replyMsg = await usersLinesService.replyMsgWhenUsingConfUI(testUserOfNotHavingMachineOp.lineId);

    expect(replyMsg.type).toBe('text');
    expect(replyMsg['text']).toBe(
      'アカウントに登録されたポスト観測機がありません。\n\n「メニュー」から「ポスト観測機の追加」を行って下さい。'
    );
  });
});
