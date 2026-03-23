import { NextFunction, Request, Response } from 'express';

export interface IUser {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  posts?: IPost[];
}

export interface IPost {
  id?: number;
  username: string;
  text: string;
  authorId: number;
  author?: IUser;
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
  findAll(): Promise<IPost[]>;
  findByUserId(id: number): Promise<IPost[]>;
  deletePostById(id: number, user: IUserRequest): Promise<IPost>;
}

export interface IPostController {
  save(req: IRequest, res: Response, next: NextFunction): Promise<void>;
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
  deletePostById(
    req: IRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
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
