import AuthController from '../controllers/auth.controller';
import { IAuthController } from '../interfaces';
import AuthService from '../services/auth.service';
import { Factory } from './factory';

class AuthFactory extends Factory<IAuthController> {
  create(): IAuthController {
    const authService = new AuthService();
    return new AuthController(authService);
  }
}

export default new AuthFactory();
