import { status } from 'entities/Order';
import { IOrder } from 'entities/Order/types/order';
import { useFetch } from 'entities/User';
import { useCallback, useEffect, useState } from 'react';
import { defaultMakeFilterString, usePaginatedApi } from 'shared/lib/usePaginatedFetch';

export const useGetOrderList = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const { isLoading, request } = useFetch();

  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);

  const checkCanLoad = useCallback(
    (orders: IOrder[]) => {
      if (orders.length < 30) {
        setCanLoad(false);
      } else {
        setPage(page + 1);
      }
    },
    [setCanLoad, setPage, page]
  );

  const fetchOrder = useCallback(
    (page: number) => {
      request<IOrder[]>(`/api/orders?page=${page}`).then((res) => {
        if (!res) return;
        setOrders(res);
        checkCanLoad(res);
      });
    },
    [request, checkCanLoad]
  );

  useEffect(() => {
    fetchOrder(page);
  }, [fetchOrder, page]);

  return {
    orders,
    isLoading,
    canLoad,
  };
};

export type OrderFilters = Partial<{
  status: status[];
  sender_id: number;
  receiver_id: number;
  status_not: status[];
}>;

const makeFilterString = (filters: OrderFilters) => {
  return defaultMakeFilterString({
    ...filters,
    status_not: filters.status_not?.filter((f) => !filters.status?.includes(f)) || [],
  });
};

export const useGetOrders = () =>
  usePaginatedApi<IOrder, OrderFilters>({
    endpoint: '/api/orders',
    initialFilters: {
      status: ['created', 'wait_payment', 'paid', 'in_delivery', 'awaiting_pickup'],
    },
    makeFilterString,
  });
