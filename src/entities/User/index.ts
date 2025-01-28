export type { IUser, UserSchema } from './model/types/user';

// state
export { userActions, userReduser } from './model/slice/userSlice';

// selectors
export { getUserState } from './model/selectors/getUserState';
export { getIsAuth } from './model/selectors/getIsAuth.ts';
