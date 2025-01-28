import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';
import { USER_AUTH_DATA } from 'shared/const/localstorage';
import { loginUserAsync } from './loginUserAsync';

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
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_AUTH_DATA);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoginProcess = true;
        state.loginError = undefined;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.authData = action.payload;
        localStorage.setItem(USER_AUTH_DATA, JSON.stringify(action.payload));
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loginError = action.payload;
      });
  },
});

export const { actions: userActions, reducer: userReduser } = userSlice;
