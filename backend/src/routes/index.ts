import { Router } from 'express';
import authFactory from '../factories/auth.factory';
import postFactory from '../factories/post.factory';
import userFactory from '../factories/user.factory';
import commentFactory from '../factories/comment.factory';
import { authToken } from '../middlewares/auth';

const router = Router();

const userController = userFactory.create();
const postController = postFactory.create();
const authController = authFactory.create();
const commentController = commentFactory.create();

router.post('/users', userController.save);
router.get('/users/:userId', authToken, userController.findUserById);
router.post('/auth', authController.auth);
router.post('/posts', authToken, postController.save);
router.get('/posts', authToken, postController.findAll);
router.post('/posts/:id/like', authToken, postController.likePost);
router.delete('/posts/:id/like', authToken, postController.unlikePost);
router.delete('/posts/:id', authToken, postController.deletePostById);
router.get('/posts/users/:userId', authToken, postController.findByUserId);

router.post('/posts/:postId/comments', authToken, commentController.createComment);
router.get('/posts/:postId/comments', authToken, commentController.getCommentsByPost);
router.delete('/comments/:id', authToken, commentController.deleteComment);

export { router };
