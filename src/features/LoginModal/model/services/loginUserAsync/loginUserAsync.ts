import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchError, ofetch } from 'ofetch';
import { BASE_URL } from 'shared/const/api';
import { IAuthRequest } from 'entities/User';
import { HttpErrorHandler } from 'shared/lib/HttpErrorHandler';
import { userActions } from 'entities/User';

export interface loginPayload {
  email: string;
  password: string;
}

export const loginUserAsync = createAsyncThunk<IAuthRequest, loginPayload, { rejectValue: string }>(
  'user/loginUserAsync',
  async (payload, thunkApi) => {
    try {
      const res = await ofetch<IAuthRequest>(`${BASE_URL}/api/login`, { method: 'post', body: { ...payload } });
      thunkApi.dispatch(userActions.setAuthData(res));
      return res;
    } catch (e: unknown) {
      if (e instanceof FetchError) {
        return thunkApi.rejectWithValue(
          HttpErrorHandler(e as FetchError, {
            401: 'features.LoginModal.errors.401',
            400: 'features.LoginModal.errors.400',
            404: 'features.LoginModal.errors.400',
          })
        );
      }
      return thunkApi.rejectWithValue('httpCodeMessage.unknown');
    }
  }
);
