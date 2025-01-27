import { render } from '@testing-library/react';
import { ReduxProvider, StateSchema } from 'app/providers/ReduxProvider';
import type { ReactNode } from 'react';
import 'app/config/i18n';

interface componentRenderOptions {
  route?: string;
  initialState?: Partial<StateSchema>;
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  return render(<ReduxProvider initialState={options.initialState as StateSchema}>{component}</ReduxProvider>);
}
