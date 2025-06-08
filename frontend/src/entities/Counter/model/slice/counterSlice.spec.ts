import { beforeEach, describe, expect, it } from 'vitest';
import { counterActions, counterReducer } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
  let state: Partial<CounterSchema>;
  beforeEach(() => {
    state = {
      value: 0,
    };
  });

  describe('increment', () => {
    it('should set value', () => {
      expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({ value: 1 });
    });
    describe('when state undefined', () => {
      it('should set value', () => {
        expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({ value: 1 });
      });
    });
  });

  describe('decrement', () => {
    it('should set value', () => {
      expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ value: -1 });
    });
    describe('when state undefined', () => {
      it('should set value', () => {
        expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ value: -1 });
      });
    });
  });
});
