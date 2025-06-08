import { IAuthData } from 'entities/User';
import { $Fetch, createFetchError, FetchContext, ofetch } from 'ofetch';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/ThestAsyncThunk';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loginUserAsync } from './loginUserAsync';
import { userActions } from 'entities/User';
import { MockedFunctionDeep } from '@storybook/test';

describe('loginUserAsync', () => {
  let mockedFetch: MockedFunctionDeep<$Fetch>;

  beforeEach(() => {
    vi.mock('ofetch', async (importOriginal) => {
      const originalModule = await importOriginal();
      return {
        ...(originalModule as object),
        ofetch: vi.fn(),
      };
    });
    mockedFetch = vi.mocked(ofetch, true);
  });

  it('success login', async () => {
    const authValue: IAuthData = {
      id: 1,
      email: 'test@email',
      token: 'test_token',
      role: 'client',
      roleId: 1,
    };

    mockedFetch.mockResolvedValue(authValue);

    const thunk = new TestAsyncThunk(loginUserAsync);
    const res = await thunk.callThunk({ email: 'test@emial', password: '123456' });

    expect(mockedFetch).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(authValue));
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(authValue);
  });

  describe('when error login', () => {
    describe.each([
      {
        statusCode: 401,
        errorMessage: 'features.LoginModal.errors.401',
      },
      {
        statusCode: 400,
        errorMessage: 'features.LoginModal.errors.400',
      },
      {
        statusCode: 404,
        errorMessage: 'features.LoginModal.errors.400',
      },
    ])('when statusCode $statusCode', ({ statusCode, errorMessage }) => {
      it('should correct value', async () => {
        const error = createFetchError({ response: { status: statusCode } } as FetchContext);

        mockedFetch.mockRejectedValue(error);

        const thunk = new TestAsyncThunk(loginUserAsync);
        const res = await thunk.callThunk({ email: 'test@emial', password: '123456' });

        expect(mockedFetch).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('rejected');
        expect(res.payload).toBe(errorMessage);
      });
    });

    it('when unknown message', async () => {
      mockedFetch.mockRejectedValue(new Error());

      const thunk = new TestAsyncThunk(loginUserAsync);
      const res = await thunk.callThunk({ email: 'test@emial', password: '123456' });

      expect(mockedFetch).toHaveBeenCalled();
      expect(res.meta.requestStatus).toBe('rejected');
      expect(res.payload).toBe('httpCodeMessage.unknown');
    });
  });
});
