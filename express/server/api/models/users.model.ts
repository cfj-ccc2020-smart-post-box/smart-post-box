import L from '../../common/logger';
import { getRepository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

export class UsersModel {
  public async getUsersList(): Promise<UsersEntity[]> {
    L.info('Get users list by users.model');

    const users = getRepository(UsersEntity)
      .createQueryBuilder()
      .from(UsersEntity, 'users')
      .leftJoin('users.users-lines', 'lines')
      .getMany();

    return users;
  }
}
