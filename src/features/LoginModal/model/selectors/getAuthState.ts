import { AuthSchema } from '../types/auth';

export const getAuthState = (state: { auth: AuthSchema }) => state.auth;
