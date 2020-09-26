import L from '../../common/logger';
import { UsersModel } from '../models/users.model';

const usersModel = new UsersModel();

export class UsersService {
  public getUsersList(): void {
    L.info('Get users list by users.service');
    usersModel.getUsersList();
    return;
  }
}
