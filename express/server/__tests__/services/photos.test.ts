import { PhotosService } from '../../api/services/photos.service';
import { getRepository, createConnection, Connection } from 'typeorm';
import { UsersLinesEntity } from '../../api/entities/users-lines.entity';
import { MachinesEntity } from '../../api/entities/machines.entity';
import { PhotosEntity } from '../../api/entities/photos.entity';
import path from 'path';

const testUserOp = {
  id: 1,
  lineId: 'Test Line ID',
  name: 'Test User',
  iconUrl: 'https://thispersondoesnotexist.com/image',
  linked: true,
};

const testUserOfNotHavingMachineOp = Object.assign({}, testUserOp);
testUserOfNotHavingMachineOp.id = 2;
testUserOfNotHavingMachineOp.lineId += '( Not having machine )';

const testMachineOp = {
  id: 1,
  uniqueCode: 'Unique Code',
  usersLinesId: testUserOp.id,
  destinationType: 'user',
  destinationId: 'User Test DM',
  stop: false,
};

const testMachineOfStoppedOp = Object.assign({}, testMachineOp);
testMachineOfStoppedOp.id = 2;
testMachineOfStoppedOp.stop = true;
testMachineOfStoppedOp.uniqueCode += 'of stopped machine';

const testMachineOfSyncedOp = Object.assign({}, testMachineOp);
testMachineOfSyncedOp.id = 3;
testMachineOfSyncedOp.uniqueCode += ' of synced machine';

const testChristmasEvePhotoOp = {
  title: 'Christmas Eve',
  machinesId: testMachineOp.id,
  created: new Date(2020, 11, 24),
  updated: new Date(2020, 11, 24),
};

const testChristmasPhotoOp = Object.assign({}, testChristmasEvePhotoOp);
testChristmasPhotoOp.title = 'Christmas';
testChristmasPhotoOp.created = new Date(2020, 11, 25);
testChristmasPhotoOp.updated = new Date(2020, 11, 25);

let connection: Connection;

describe('PhotosService', () => {
  beforeEach(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: path.join(__dirname, '..', '..', '..', `db.${__filename.split(/[\\/]services[\\/]|\.ts$/)[1]}.splite`),
      entities: [UsersLinesEntity, MachinesEntity, PhotosEntity],
      synchronize: true,
    });

    const usersLinesRepository = getRepository(UsersLinesEntity);
    await usersLinesRepository.save(usersLinesRepository.create(testUserOp));
    await usersLinesRepository.save(usersLinesRepository.create(testUserOfNotHavingMachineOp));

    const machinesRepository = getRepository(MachinesEntity);
    await machinesRepository.save(machinesRepository.create(testMachineOp));
    await machinesRepository.save(machinesRepository.create(testMachineOfStoppedOp));
    await machinesRepository.save(machinesRepository.create(testMachineOfSyncedOp));

    const photosRepository = getRepository(PhotosEntity);
    await photosRepository.save(photosRepository.create(testChristmasEvePhotoOp));
    await photosRepository.save(photosRepository.create(testChristmasPhotoOp));
  });

  afterEach(async () => {
    const usersLinesRepository = getRepository(UsersLinesEntity);
    await usersLinesRepository.delete({ lineId: testUserOp.lineId });
    await usersLinesRepository.delete({ lineId: testUserOfNotHavingMachineOp.lineId });

    const machinesRepository = getRepository(MachinesEntity);
    await machinesRepository.delete({ destinationId: testMachineOp.destinationId });

    const photosRepository = getRepository(PhotosEntity);
    await photosRepository.delete({ machinesId: testMachineOp.id });

    await connection.close();
  });

  it('If unknown IoT device ask last photo title, It will get this response.', async () => {
    const photosService = new PhotosService();
    const res = await photosService.getLastPhotoTitleByMachineId('unknown');

    expect(res).toBe('invalid unique code');
  });

  it('If stopped IoT device ask last photo title, It will get this response.', async () => {
    const photosService = new PhotosService();
    const res = await photosService.getLastPhotoTitleByMachineId(testMachineOfStoppedOp.uniqueCode);

    expect(res).toBe('this machine is already stopped.');
  });

  it('If IoT device of not having photo ask last photo title, It will get this response.', async () => {
    const photosService = new PhotosService();
    const res = await photosService.getLastPhotoTitleByMachineId(testMachineOfSyncedOp.uniqueCode);

    expect(res).toBe('there is not that photo.');
  });

  it('If IoT device ask last photo title, It will get this response.', async () => {
    const photosService = new PhotosService();
    const res = await photosService.getLastPhotoTitleByMachineId(testMachineOp.uniqueCode);

    expect(res).toBe(testChristmasPhotoOp.title);
  });
});
