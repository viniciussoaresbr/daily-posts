import { NextFunction, Response } from "express";
import {
  ICommentController,
  ICommentService,
  IRequest,
  IUserRequest,
} from "../interfaces";

class CommentController implements ICommentController {
  constructor(private commentService: ICommentService) {
    this.createComment = this.createComment.bind(this);
    this.getCommentsByPost = this.getCommentsByPost.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async createComment(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.commentService.createComment(
        parseInt(req.params.postId),
        req.body.text,
        req.user as IUserRequest,
      );
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByPost(req: IRequest, res: Response, next: NextFunction) {
    try {
      const data = await this.commentService.getCommentsByPost(
        parseInt(req.params.postId),
      );
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req: IRequest, res: Response, next: NextFunction) {
    try {
      await this.commentService.deleteComment(
        parseInt(req.params.id),
        req.user as IUserRequest,
      );
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default CommentController;
