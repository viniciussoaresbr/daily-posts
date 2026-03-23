import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  IPostController,
  IPostService,
  IRequest,
  IUserRequest,
} from '../interfaces';

class PostController implements IPostController {
  constructor(private postService: IPostService) {}

  save = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      await this.postService.save(req.body, req.user as IUserRequest);
      res.status(201).send({ message: 'Post criado com sucesso' });
    } catch (error) {
      next(new createHttpError.BadRequest('Data inválida'));
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.postService.findAll();
      res.status(200).send(data);
    } catch (error) {
      next(new createHttpError.BadRequest('Não foi possível exibir os posts'));
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.postService.findByUserId(
        parseInt(req.params.userId),
      );
      res.status(200).send(data);
    } catch (error) {
      next(new createHttpError.BadRequest('Não foi possível exibir os posts'));
    }
  };

  deletePostById = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      await this.postService.deletePostById(
        parseInt(req.params.id),
        req.user as IUserRequest,
      );
      res.status(201).send({ message: 'Post deletado' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
