import { NextFunction, Request, Response } from 'express';

export interface IUser {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  posts?: IPost[];
  likes?: ILike[];
}

export interface IPost {
  id?: number;
  username: string;
  text: string;
  authorId: number;
  author?: IUser;
  likesCount?: number;
  likedByCurrentUser?: boolean;
  likes?: ILike[];
}

export interface ILike {
  id?: number;
  userId: number;
  postId: number;
  user?: IUser;
  post?: IPost;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRequest {
  userId: number;
  username: string;
}

export interface IRequest extends Request {
  user?: IUserRequest;
}

export interface IPostService {
  save(postBody: Partial<IPost>, user: IUserRequest): Promise<IPost>;
  findAll(user: IUserRequest): Promise<IPost[]>;
  findByUserId(id: number, user: IUserRequest): Promise<IPost[]>;
  deletePostById(id: number, user: IUserRequest): Promise<IPost>;
  likePost(
    postId: number,
    user: IUserRequest,
  ): Promise<{ likesCount: number; likedByCurrentUser: boolean }>;
  unlikePost(
    postId: number,
    user: IUserRequest,
  ): Promise<{ likesCount: number; likedByCurrentUser: boolean }>;
}

export interface IPostController {
  save(req: IRequest, res: Response, next: NextFunction): Promise<void>;
  findAll(req: IRequest, res: Response, next: NextFunction): Promise<void>;
  findByUserId(req: IRequest, res: Response, next: NextFunction): Promise<void>;
  deletePostById(
    req: IRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  likePost(req: IRequest, res: Response, next: NextFunction): Promise<void>;
  unlikePost(req: IRequest, res: Response, next: NextFunction): Promise<void>;
}

export interface IUserService {
  save(userBody: IUser): Promise<IUser>;
  findUserById(id: number): Promise<IUser | null>;
}

export interface IUserController {
  save(req: Request, res: Response, next: NextFunction): Promise<void>;
  findUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IAuthService {
  auth(userLogin: IUserLogin): Promise<{ userId: number; accessToken: string }>;
}

export interface IAuthController {
  auth(req: Request, res: Response, next: NextFunction): Promise<void>;
}
