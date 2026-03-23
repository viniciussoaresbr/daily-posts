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
