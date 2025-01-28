import { createSelector } from '@reduxjs/toolkit';
import { getAuthState } from './getAuthState';

export const getLoginError = createSelector(getAuthState, (state) => state.loginError);
