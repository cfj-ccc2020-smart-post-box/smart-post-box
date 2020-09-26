import { Controller, Post, Route } from 'tsoa';
import { UsersLinesService } from '../../services/users-lines.service';
import { UsersLinesModel } from '../../models/users-lines.model';

const usersLinesModel = new UsersLinesModel();
const usersLinesService = new UsersLinesService(usersLinesModel);

@Route('users')
export class DevController extends Controller {
  @Post('/')
  public async getUsersList(): Promise<{ name: string; iconUrl: string }[]> {
    const usersList = await usersLinesService.getUsersList();
    return usersList;
  }
}
