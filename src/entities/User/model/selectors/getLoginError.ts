import { createSelector } from '@reduxjs/toolkit';
import { getUserState } from './getUserState';

export const getLoginError = createSelector(getUserState, (state) => state.loginError);
