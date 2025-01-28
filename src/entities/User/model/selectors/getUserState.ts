import { UserSchema } from '../types/user';

export const getUserState = (state: { user: UserSchema }) => state.user;
