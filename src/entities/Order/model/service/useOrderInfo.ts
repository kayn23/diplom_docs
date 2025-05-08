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

  useEffect(() => {
    if (!id) return;
    getOrderInfo(id);
  }, [id, getOrderInfo]);

  return {
    order,
    isLoading,
    getOrderInfo,
    setOrder,
  };
}
