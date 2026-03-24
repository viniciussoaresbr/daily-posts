import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import {
  IPostController,
  IPostService,
  IRequest,
  IUserRequest,
} from "../interfaces";

class PostController implements IPostController {
  constructor(private postService: IPostService) {
    this.save = this.save.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findByUserId = this.findByUserId.bind(this);
    this.deletePostById = this.deletePostById.bind(this);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
  }

  async save(req: IRequest, res: Response, next: NextFunction) {
    try {
      await this.postService.save(req.body, req.user as IUserRequest);
      res.status(201).send({ message: "Post criado com sucesso" });
    } catch (error) {
      next(new createHttpError.BadRequest("Data inválida"));
    }
  }

  async findAll(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.postService.findAll(req.user as IUserRequest);
      res.status(200).send(data);
    } catch (error) {
      next(new createHttpError.BadRequest("Não foi possível exibir os posts"));
    }
  }

  async findByUserId(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.postService.findByUserId(
        parseInt(req.params.userId),
        req.user as IUserRequest,
      );
      res.status(200).send(data);
    } catch (error) {
      next(new createHttpError.BadRequest("Não foi possível exibir os posts"));
    }
  }

  async deletePostById(req: IRequest, res: Response, next: NextFunction) {
    try {
      await this.postService.deletePostById(
        parseInt(req.params.id),
        req.user as IUserRequest,
      );
      res.status(201).send({ message: "Post deletado" });
    } catch (error) {
      next(error);
    }
  }

  async likePost(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.postService.likePost(
        parseInt(req.params.id),
        req.user as IUserRequest,
      );
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async unlikePost(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.postService.unlikePost(
        parseInt(req.params.id),
        req.user as IUserRequest,
      );
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}

export default PostController;
