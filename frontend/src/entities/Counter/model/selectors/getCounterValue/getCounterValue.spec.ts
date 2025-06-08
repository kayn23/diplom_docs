import { describe, expect, it } from 'vitest';
import { getCounterValue } from './getCounterValue';
import { StateSchema } from 'app/providers/ReduxProvider';

describe('getCounterValue', () => {
  it('should return correct vaule', () => {
    const store: Partial<StateSchema> = {
      counter: {
        value: 10,
      },
    };

    expect(getCounterValue(store as StateSchema)).toBe(10);
  });
});
