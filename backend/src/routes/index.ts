import { Router } from 'express';
import authFactory from '../factories/auth.factory';
import postFactory from '../factories/post.factory';
import userFactory from '../factories/user.factory';
import { authToken } from '../middlewares/auth';

const router = Router();

const userController = userFactory.create();
const postController = postFactory.create();
const authController = authFactory.create();

router.post('/users', userController.save);
router.get('/users/:userId', authToken, userController.findUserById);
router.post('/auth', authController.auth);
router.post('/posts', authToken, postController.save);
router.get('/posts', authToken, postController.findAll);
router.delete('/posts/:id', authToken, postController.deletePostById);
router.get('/posts/users/:userId', authToken, postController.findByUserId);

export { router };
