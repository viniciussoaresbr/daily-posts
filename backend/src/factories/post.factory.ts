import PostController from '../controllers/post.controller';
import { IPostController } from '../interfaces';
import PostService from '../services/post.service';
import { Factory } from './factory';

class PostFactory extends Factory<IPostController> {
  create(): IPostController {
    const postService = new PostService();
    return new PostController(postService);
  }
}

export default new PostFactory();
