import { IOrder } from 'entities/Order/model/types/order';
import { useFetch } from 'entities/User';
import { useCallback, useEffect, useState } from 'react';

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
