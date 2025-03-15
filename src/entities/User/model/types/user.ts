export interface IUser {
  id: number;
  email: string;
  firstname?: string;
  surname?: string;
  lastname?: string;
  document_numebr?: string;
  roles: string[];
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
