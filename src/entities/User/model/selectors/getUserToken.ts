import { createSelector } from '@reduxjs/toolkit';
import { getUserState } from './getUserState';

export const getUserToken = createSelector(getUserState, (state) => state.authData);
