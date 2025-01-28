export interface IUser {
  id: number;
  email: string;
}

export interface IAuthData {
  id: number;
  email: string;
  roleId: number;
  role: string;
  token: string;
}

export interface UserSchema {
  user?: IUser;
  authData?: IAuthData;
  isLoginProcess: boolean;
  loginError?: string;
}
