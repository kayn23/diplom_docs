import { createSelector } from '@reduxjs/toolkit';
import { getUserState } from './getUserState';

export const getIsAuth = createSelector(getUserState, (state) => !!state.authData);
