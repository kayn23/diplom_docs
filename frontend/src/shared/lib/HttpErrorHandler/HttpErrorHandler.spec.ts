import { createFetchError, FetchContext } from 'ofetch';
import { describe, expect, it } from 'vitest';
import { HttpErrorHandler } from './HttpErrorHandler';

describe('HttpErrorHandler', () => {
  describe.each([
    { statusCode: 401, text: 'httpCodeMessage.401' },
    { statusCode: undefined, text: 'httpCodeMessage.unknown' },
    { staatusCode: 999, text: 'httpCodeMessage.unknown' },
  ])('statusCode $statusCode', ({ statusCode, text }) => {
    it('should correct text', () => {
      const error = createFetchError({ response: { status: statusCode } } as FetchContext);
      const res = HttpErrorHandler(error);

      expect(res).toBe(text);
    });
  });

  describe('when customMessage present', () => {
    it('should correct text', () => {
      const customMessage = {
        401: 'customMessage',
      };
      const error = createFetchError({ response: { status: 401 } } as FetchContext);
      const res = HttpErrorHandler(error, customMessage);

      expect(res).toBe('customMessage');
    });
  });
});
