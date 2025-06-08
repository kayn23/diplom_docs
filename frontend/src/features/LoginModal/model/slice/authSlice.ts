import { createSlice } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/auth';
import { loginUserAsync } from '../services/loginUserAsync/loginUserAsync';

const initialState: AuthSchema = {
  isLoginProcess: false,
  loginError: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    clearState: (state) => {
      state.loginError = undefined;
      state.isLoginProcess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoginProcess = true;
        state.loginError = undefined;
      })
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.isLoginProcess = false;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoginProcess = false;
        state.loginError = action.payload;
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
