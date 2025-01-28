import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthData, UserSchema } from '../types/user';
import { USER_AUTH_DATA } from 'shared/const/localstorage';

const initialState: UserSchema = {
  user: undefined,
  authData: undefined,
  isLoginProcess: false,
  loginError: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initAuthData: (state) => {
      const authData = localStorage.getItem(USER_AUTH_DATA);
      if (authData) {
        state.authData = JSON.parse(authData);
      }
    },
    setAuthData: (state, action: PayloadAction<IAuthData>) => {
      state.authData = action.payload;
      localStorage.setItem(USER_AUTH_DATA, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_AUTH_DATA);
    },
  },
});

export const { actions: userActions, reducer: userReduser } = userSlice;
