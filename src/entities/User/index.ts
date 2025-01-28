export type { IUser, UserSchema } from './model/types/user';

// state
export { loginUserAsync } from './model/slice/loginUserAsync';
export { userActions, userReduser } from './model/slice/userSlice';

// selectors
export { getLoginError } from './model/selectors/getLoginError';
export { getUserState } from './model/selectors/getUserState';
export { getIsAuth } from './model/selectors/getIsAuth.ts';
