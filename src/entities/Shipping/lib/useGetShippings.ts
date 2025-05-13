import { useCallback, useEffect, useState } from 'react';
import { IShipping } from '../types/shipping';
import { useFetch } from 'entities/User';
import { useFilters } from 'shared/lib/requests/useFilters';
import { usePaginationHelpers } from 'shared/lib/requests/usePaginationHelpers';

export type IShippingFilter = Partial<{
  assignee_id_eq: number;
}>;

export const useGetShippings = (initialFilters: IShippingFilter = {}) => {
  const [shippings, setShippings] = useState<IShipping[]>([]);
  const { filters, setFilter } = useFilters(initialFilters);

  const { page, setPage, canLoad, checkCanLoad } = usePaginationHelpers();

  const makeFilterString = useCallback((filters: IShippingFilter) => {
    let res = '';
    if (filters.assignee_id_eq) {
      res += `q[assignee_id_eq]=${filters.assignee_id_eq}`;
    }
    return res;
  }, []);

  const { request, isLoading } = useFetch();
  const getShippings = useCallback(
    (page: number, filters: IShippingFilter = {}) => {
      request<IShipping[]>(`/api/shippings?page=${page}${makeFilterString(filters)}`).then((res) => {
        if (!res) return;
        setShippings(res);
        checkCanLoad(res);
      });
    },
    [request, makeFilterString, checkCanLoad]
  );

  const loadMore = useCallback(() => {
    if (canLoad && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [canLoad, isLoading, setPage]);

  const onReload = useCallback(() => {
    getShippings(page, filters);
  }, [getShippings, page, filters]);

  useEffect(() => {
    onReload();
  }, [onReload]);

  return {
    shippings,
    filters,
    setFilter,
    loadMore,
  };
};
