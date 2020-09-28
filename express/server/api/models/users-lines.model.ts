import L from '../../common/logger';
import * as line from '@line/bot-sdk';
import { getRepository } from 'typeorm';
import { UsersLinesEntity } from '../entities/users-lines.entity';

export class UsersLinesModel {
  readonly client: line.Client;

  constructor(client?: line.Client) {
    this.client = client;
  }

  public async getProfile(lineId: string): Promise<line.Profile> {
    L.info('Get line profile.');

    if (!this.client) {
      throw new Error('Line client is not initialized.');
    }

    return this.client.getProfile(lineId);
  }

  public async createNewUserFromLine(lineId: string): Promise<UsersLinesEntity> {
    L.info('createNewUserFromLine');

    const usersLinesRepository = getRepository(UsersLinesEntity);
    let user = await usersLinesRepository.findOne({ lineId });

    if (user) {
      user.using = true;
      user = await usersLinesRepository.save(user);
      return user;
    }

    const userProfile = await this.getProfile(lineId);
    const newUser = usersLinesRepository.create({
      lineId,
      name: userProfile.displayName,
      iconUrl: userProfile.pictureUrl,
      linked: true,
    });

    user = await usersLinesRepository.save(newUser);

    return user;
  }

  public async closeUserFromLine(lineId: string): Promise<UsersLinesEntity> {
    L.info('closeUserFromLine');

    const usersLinesRepository = getRepository(UsersLinesEntity);
    let user = await usersLinesRepository.findOne({ lineId });

    if (user) {
      user.using = false;
      user = await usersLinesRepository.save(user);
      return user;
    }
  }

  public async getUsersList(): Promise<UsersLinesEntity[]> {
    L.info('getUsersList');

    const usersLinesRepository = getRepository(UsersLinesEntity);
    const users = await usersLinesRepository.find();

    return users;
  }

  public async getUserByLineId(lineId: string): Promise<UsersLinesEntity> {
    L.info('getUserByLineId');

    const usersLinesRepository = getRepository(UsersLinesEntity);
    const user = await usersLinesRepository.findOne({ lineId });

    return user;
  }
}
