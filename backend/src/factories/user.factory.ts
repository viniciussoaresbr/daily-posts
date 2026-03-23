import UserController from '../controllers/user.controller';
import { IUserController } from '../interfaces';
import UserService from '../services/user.service';
import { Factory } from './factory';

class UserFactory extends Factory<IUserController> {
  create(): IUserController {
    const userService = new UserService();
    return new UserController(userService);
  }
}

export default new UserFactory();
