import { NextFunction, Request, Response } from "express";
import { IUserController, IUserService } from "../interfaces";

class UserController implements IUserController {
  constructor(private userService: IUserService) {
    this.save = this.save.bind(this);
    this.findUserById = this.findUserById.bind(this);
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.save(req.body);
      res.status(201).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async findUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.findUserById(
        parseInt(req.params.userId),
      );
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
