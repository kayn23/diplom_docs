import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthRequest, UserSchema } from '../../types/user';
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
        const data = JSON.parse(authData);
        state.authData = data.token;
        state.user = data.user;
      }
    },
    setAuthData: (state, action: PayloadAction<IAuthRequest>) => {
      state.authData = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(USER_AUTH_DATA, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.authData = undefined;
      state.user = undefined;
      state.loginError = undefined;
      state.isLoginProcess = false;
      localStorage.removeItem(USER_AUTH_DATA);
    },
  },
});

export const { actions: userActions, reducer: userReduser } = userSlice;
