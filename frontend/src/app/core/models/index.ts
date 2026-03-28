export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
}

export interface IPost {
  id: number;
  text: string;
  username: string;
  authorId: number;
  likesCount: number;
  likedByCurrentUser: boolean;
  commentsCount: number;
}

export interface IComment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  username: string;
}

export interface IPostRequest {
  text: string;
}

export interface IUserRegister extends IUser {
  password?: string;
}

export interface IAuthResponse {
  accessToken: string;
  userId: number;
}

export interface ILikeResponse {
  likesCount: number;
  likedByCurrentUser: boolean;
}
