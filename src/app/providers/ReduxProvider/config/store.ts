import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: combineReducers({
      counter: counterReducer,
    }),
    // devTools: import.meta.env.MODE === 'development',
    preloadedState: initialState,
  });
}
