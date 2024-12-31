import { describe, it, expect } from 'vitest';
import { classNames } from './classNames';

describe('classNames', () => {
  describe('when only cls', () => {
    it('should be text', () => {
      expect(classNames('testClass')).toBe('testClass ');
    });
  });

  describe('when have mods', () => {
    describe.each([
      {
        value: { testMod: true },
        expected: 'testMod',
      },
      {
        value: { testMod: false },
        expected: '',
      },
      {
        value: { testMod: undefined },
        expected: '',
      },
      {
        value: undefined,
        expected: '',
      },
    ])('$value', ({ value, expected }) => {
      it('should be text', () => {
        expect(classNames('test', { mods: value })).toBe(`test ${expected}`);
      });
    });
  });

  describe('when have additional', () => {
    it('should be text', () => {
      expect(classNames('test', { additional: ['addClass'] })).toBe('test  addClass');
    });
  });
});
