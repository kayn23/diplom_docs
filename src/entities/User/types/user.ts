import { Roles } from './roles';

export interface IUser {
  id: number;
  email: string;
  firstname?: string;
  surname?: string;
  lastname?: string;
  document_number?: string;
  roles: Roles[];
  password?: string;
}

export interface IAuthData {
  id: number;
  email: string;
  roleId: number;
  role: string;
  token: string;
}

export interface IAuthRequest {
  user: IUser;
  token: string;
}

export interface UserSchema {
  user?: IUser;
  authData?: string;
  isLoginProcess: boolean;
  loginError?: string;
}
