import createHttpError from "http-errors";
import { prisma } from "../database/prisma";
import { IPost, IPostService, IUserRequest } from "../interfaces";

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

  async findAll(user: IUserRequest): Promise<IPost[]> {
    const posts = await prisma.post.findMany({
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: user.userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    return posts.map(post => ({
      id: post.id,
      username: post.username,
      text: post.text,
      authorId: post.authorId,
      likesCount: post._count.likes,
      likedByCurrentUser: post.likes.length > 0,
    })) as IPost[];
  }

  async findByUserId(id: number, user: IUserRequest): Promise<IPost[]> {
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: user.userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    return posts.map(post => ({
      id: post.id,
      username: post.username,
      text: post.text,
      authorId: post.authorId,
      likesCount: post._count.likes,
      likedByCurrentUser: post.likes.length > 0,
    })) as IPost[];
  }

  async deletePostById(id: number, user: IUserRequest): Promise<IPost> {
    const userPosts = await this.findByUserId(user.userId, user);

    const postExists = userPosts.some(post => post.id === id);

    if (!postExists) {
      throw new createHttpError.BadRequest("Esse post não existe");
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return deletedPost as IPost;
  }

  async likePost(
    postId: number,
    user: IUserRequest,
  ): Promise<{ likesCount: number; likedByCurrentUser: boolean }> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new createHttpError.NotFound("Esse post não existe");
    }

    const likeExists = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.userId,
          postId: postId,
        },
      },
    });

    if (!likeExists) {
      await prisma.like.create({
        data: {
          userId: user.userId,
          postId: postId,
        },
      });
    }

    const likesCount = await prisma.like.count({
      where: {
        postId: postId,
      },
    });

    return {
      likesCount,
      likedByCurrentUser: true,
    };
  }

  async unlikePost(
    postId: number,
    user: IUserRequest,
  ): Promise<{ likesCount: number; likedByCurrentUser: boolean }> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new createHttpError.NotFound("Esse post não existe");
    }

    const likeExists = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.userId,
          postId: postId,
        },
      },
    });

    if (likeExists) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.userId,
            postId: postId,
          },
        },
      });
    }

    const likesCount = await prisma.like.count({
      where: {
        postId: postId,
      },
    });

    return {
      likesCount,
      likedByCurrentUser: false,
    };
  }
}

export default PostService;
