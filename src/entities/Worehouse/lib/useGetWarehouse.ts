import { useFetch } from 'entities/User';
import { useCallback, useEffect, useState } from 'react';
import { IWarehouseDetails } from '../model/types/warehouse';

export const useGetWarehouse = (id: string | number) => {
  const { request, isLoading } = useFetch();

  const [warehouse, setWarehouse] = useState<IWarehouseDetails | undefined>(undefined);

  const getWarehouseInfo = useCallback(() => {
    request<IWarehouseDetails>(`/api/warehouses/${id}`).then((res) => {
      if (!res) return;
      setWarehouse(res);
    });
  }, [request, id]);

  useEffect(() => {
    getWarehouseInfo();
  }, [getWarehouseInfo]);

  return {
    warehouse,
    isLoading,
    getWarehouseInfo,
  };
};
