import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter';
import { userReduser } from 'entities/User';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: combineReducers({
      counter: counterReducer,
      user: userReduser,
    }),
    // devTools: import.meta.env.MODE === 'development',
    preloadedState: initialState,
  });
}

// Определите типы для dispatch и состояния
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>;
