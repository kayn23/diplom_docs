import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchError, ofetch } from 'ofetch';
import { BASE_URL } from 'shared/const/api';
import { IAuthData } from '../../../../../entities/User/model/types/user';
import { HttpErrorHandler } from 'shared/lib/HttpErrorHandler';
import { userActions } from 'entities/User';

interface loginPayload {
  email: string;
  password: string;
}

export const loginUserAsync = createAsyncThunk<IAuthData, loginPayload, { rejectValue: string }>(
  'user/loginUserAsync',
  async (payload, thunkApi) => {
    try {
      const res = await ofetch<IAuthData>(`${BASE_URL}/auth/login`, { method: 'post', body: { ...payload } });
      thunkApi.dispatch(userActions.setAuthData(res));
      return res;
    } catch (e: unknown) {
      if (e instanceof FetchError && e.statusCode) {
        return thunkApi.rejectWithValue(
          HttpErrorHandler(e, {
            401: 'features.LoginModal.errors.401',
            400: 'features.LoginModal.errors.400',
            404: 'features.LoginModal.errors.400',
          })
        );
      }
      return thunkApi.rejectWithValue('unknown error');
    }
  }
);
