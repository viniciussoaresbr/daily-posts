import createHttpError from 'http-errors';
import { prisma } from '../database/prisma';
import { IPost, IPostService, IUserRequest } from '../interfaces';

class PostService implements IPostService {
  async save(postBody: Partial<IPost>, user: IUserRequest): Promise<IPost> {
    const post = await prisma.post.create({
      data: {
        username: user?.username,
        text: postBody.text as string,
        author: {
          connect: {
            id: user?.userId,
          },
        },
      },
    });

    return post as IPost;
  }

  async findAll(): Promise<IPost[]> {
    const posts = await prisma.post.findMany();
    return posts as IPost[];
  }

  async findByUserId(id: number): Promise<IPost[]> {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          id: id,
        },
      },
    });
    return posts as IPost[];
  }

  async deletePostById(id: number, user: IUserRequest): Promise<IPost> {
    const userPosts = await this.findByUserId(user.userId);

    const postExists = userPosts.some(post => post.id === id);

    if (!postExists) {
      throw new createHttpError.BadRequest('Esse post não existe');
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return deletedPost as IPost;
  }
}

export default PostService;
