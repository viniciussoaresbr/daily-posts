import CommentController from '../controllers/comment.controller';
import { ICommentController } from '../interfaces';
import CommentService from '../services/comment.service';
import { Factory } from './factory';

class CommentFactory extends Factory<ICommentController> {
  create(): ICommentController {
    const commentService = new CommentService();
    return new CommentController(commentService);
  }
}

export default new CommentFactory();
