import { NextFunction, Request, Response } from 'express';
import { IAuthController, IAuthService } from '../interfaces';

class AuthController implements IAuthController {
  constructor(private authService: IAuthService) {}

  auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.authService.auth(req.body);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
