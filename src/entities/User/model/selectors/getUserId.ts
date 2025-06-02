import { createSelector } from '@reduxjs/toolkit';
import { getUserState } from './getUserState';

export const getUserId = createSelector(getUserState, (state) => state.user?.id);
