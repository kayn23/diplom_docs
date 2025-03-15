import { FetchOptions, MappedResponseType, ofetch } from 'ofetch';
import { useCallback, useState } from 'react';
import { BASE_URL } from 'shared/const/api';
import { USER_AUTH_DATA } from 'shared/const/localstorage';

type FetchRequest = RequestInfo;
interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
  stream: ReadableStream<Uint8Array>;
}
type ResponseType = keyof ResponseMap | 'json';
type ofetch<T = never, R extends ResponseType = 'json'> = (
  request: FetchRequest,
  options?: FetchOptions<R>
) => Promise<MappedResponseType<R, T>>;

export const useFetch = <E = string>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<E>();

  const request = useCallback(
    async <T = never, R extends ResponseType = 'json'>(request: string, options?: FetchOptions<R>) => {
      const ls = localStorage.getItem(USER_AUTH_DATA);
      if (!ls) throw new Error('User authentication data not found');

      const userInfo = JSON.parse(ls);
      const token = userInfo.token;

      setIsLoading(true);
      return ofetch<T, R>(`${BASE_URL}${request}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...options,
      })
        .then((res) => res)
        .catch((err) => {
          setError(err);
          return undefined;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return {
    request,
    isLoading,
    error,
  };
};
