import { IOrder } from 'entities/Order';
import { useFetch } from 'entities/User';
import { useCallback, useEffect, useState } from 'react';

export function useOrderInfo(id: number | string | undefined) {
  const { request, isLoading } = useFetch();
  const [order, setOrder] = useState<IOrder | undefined>(undefined);

  const getOrderInfo = useCallback(
    async (id: string | number) => {
      return request<IOrder>(`/api/orders/${id}`).then((res) => {
        setOrder(res);
        return res;
      });
    },
    [request]
  );

  const onReloadOrderInfo = useCallback(() => {
    if (!id) return;
    getOrderInfo(id);
  }, [id, getOrderInfo]);

  useEffect(() => {
    onReloadOrderInfo();
  }, [onReloadOrderInfo]);

  return {
    order,
    isLoading,
    getOrderInfo,
    setOrder,
    onReloadOrderInfo,
  };
}
