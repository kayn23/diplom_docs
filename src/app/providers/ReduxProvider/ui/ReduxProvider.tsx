import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface ReduxProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
}

export const ReduxProvider: FC<ReduxProviderProps> = ({ children, initialState }) => {
  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
