import createHttpError from "http-errors";
import { prisma } from "../database/prisma";
import { IComment, ICommentService, IUserRequest } from "../interfaces";

class CommentService implements ICommentService {
  async createComment(
    postId: number,
    text: string,
    user: IUserRequest,
  ): Promise<IComment> {
    if (!text || text.trim() === "") {
      throw new createHttpError.BadRequest("O comentário não pode estar vazio");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new createHttpError.NotFound("Esse post não existe");
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        userId: user.userId,
        username: user.username,
      },
    });

    return comment as IComment;
  }

  async getCommentsByPost(postId: number): Promise<IComment[]> {
    const comments = await prisma.comment.findMany({
      where: { postId },
    });

    return comments as IComment[];
  }

  async deleteComment(commentId: number, user: IUserRequest): Promise<IComment> {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new createHttpError.NotFound("Comentário não encontrado");
    }

    if (comment.userId !== user.userId) {
      throw new createHttpError.Forbidden("Você não tem permissão para deletar este comentário");
    }

    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });

    return deletedComment as IComment;
  }
}

export default CommentService;
