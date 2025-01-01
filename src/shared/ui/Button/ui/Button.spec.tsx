import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  describe('when simple button', () => {
    beforeEach(() => {
      render(<Button>button</Button>);
    });

    it('should contains button', () => {
      expect(screen.getByText('button')).toBeInTheDocument();
    });
  });
});
