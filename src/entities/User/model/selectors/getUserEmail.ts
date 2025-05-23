import { createSelector } from '@reduxjs/toolkit';
import { getUserState } from './getUserState';

export const getUserEmail = createSelector(getUserState, (state) => state.user?.email);
