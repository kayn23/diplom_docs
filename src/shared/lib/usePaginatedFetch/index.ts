import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetch } from 'entities/User';
import { useDebouncedCallback } from '../debounceFunction/debounceFunc';

type MakeFilterString<F> = (filters: F) => string;

type UsePaginatedApiParams<F> = {
  endpoint: string;
  initialFilters?: F;
  makeFilterString?: MakeFilterString<F>;
  pageSize?: number;
  debounceDelay?: number;
};

function defaultMakeFilterString<F extends Record<string, unknown>>(filters: F): string {
  return Object.entries(filters)
    .filter(([, v]) => v != null)
    .map(([key, val]) => `q[${key}_eq]=${val}`)
    .join('&');
}

export const usePaginatedApi = <T, F extends Record<string, unknown>>({
  endpoint,
  initialFilters = {} as F,
  makeFilterString = defaultMakeFilterString,
  pageSize = 30,
}: UsePaginatedApiParams<F>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);
  const { request, isLoading } = useFetch();

  const [filters, setFilters] = useState<F>(initialFilters);

  const setFilter = useDebouncedCallback((key: keyof T, value: T[keyof T]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, 300);

  const checkCanLoad = useCallback(
    (newData: T[]) => {
      setCanLoad(newData.length >= pageSize);
    },
    [pageSize]
  );

  const fetchData = useCallback(
    async (pageToLoad: number, filters: F) => {
      const query = makeFilterString(filters);
      const res = await request<T[]>(`${endpoint}?page=${pageToLoad}${query ? '&' + query : ''}`);
      if (res) {
        setData((prev) => (pageToLoad === 1 ? res : [...prev, ...res]));
        checkCanLoad(res);
      }
    },
    [makeFilterString, request, endpoint, checkCanLoad]
  );

  useEffect(() => {
    fetchData(page, filters); // only ref, no dependency on filters
  }, [page, fetchData, filters]);

  const onReload = useCallback(() => {
    fetchData(page, filters); // only ref, no dependency on filters
  }, [fetchData, filters, page]);

  const loadMore = useCallback(() => {
    if (canLoad && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [canLoad, isLoading]);

  return {
    data,
    filters,
    setFilter,
    loadMore,
    isLoading,
    onReload,
  };
};
