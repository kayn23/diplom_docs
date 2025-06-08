import { createSelector } from '@reduxjs/toolkit';
import { getUserState } from './getUserState';

export const getUserRoles = createSelector(getUserState, (state) => state.user?.roles);
