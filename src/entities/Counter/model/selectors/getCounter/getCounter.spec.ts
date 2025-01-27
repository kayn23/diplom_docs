import { describe } from 'node:test';
import { getCounter } from './getCounter';
import { expect, it } from 'vitest';
import { StateSchema } from 'app/providers/ReduxProvider';

describe('getCounter', () => {
  it('should return correct value', () => {
    const state: Partial<StateSchema> = {
      counter: {
        value: 0,
      },
    };

    expect(getCounter(state as StateSchema)).toEqual({ value: 0 });
  });
});
