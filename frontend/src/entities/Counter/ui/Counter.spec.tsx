import { beforeEach, describe, expect, it } from 'vitest';
import { Counter } from './Counter';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { StateSchema } from 'app/providers/ReduxProvider';
import { fireEvent, screen } from '@testing-library/react';

describe('Counter', () => {
  let state: Partial<StateSchema>;
  beforeEach(() => {
    state = {
      counter: { value: 10 },
    };
    componentRender(<Counter />, {
      initialState: state,
    });
  });

  it('default render', () => {
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  it('increment', () => {
    fireEvent.click(screen.getByTestId('increment-button'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  it('decrement', () => {
    fireEvent.click(screen.getByTestId('decrement-button'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
