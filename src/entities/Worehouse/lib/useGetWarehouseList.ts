import { useCallback, useEffect, useState } from 'react';
import { IWarehouse } from '../model/types/warehouse';
import { useAdmin, useFetch } from 'entities/User';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

export type WarehouseFilterType = Partial<{
  search: string;
  city_id_eq: { id: number; name: string };
  name_or_address_or_city_name_cont: string;
}>;

export const useGetWarehouseList = () => {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [warehouseFilters, setWarehouseFilters] = useState<WarehouseFilterType>({});

  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);

  const checkCanLoad = useCallback(
    (orders: IWarehouse[]) => {
      if (orders.length < 30) {
        setCanLoad(false);
      }
    },
    [setCanLoad]
  );

  const setWarehouseFilter = useDebouncedCallback(
    (key: keyof WarehouseFilterType, value: WarehouseFilterType[keyof WarehouseFilterType]) => {
      setWarehouseFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
      setPage(1);
      setCanLoad(true);
    },
    300
  );

  const makeFilterString = useCallback((filters: WarehouseFilterType) => {
    let res = '';
    if (filters.city_id_eq) {
      res += `&q[city_id_eq]=${filters.city_id_eq.id}`;
    }
    if (filters.name_or_address_or_city_name_cont) {
      res += `&q[name_or_address_or_city_name_cont]=${filters.name_or_address_or_city_name_cont}`;
    }
    return res;
  }, []);

  const { isLoading, request } = useFetch();
  const fetchWarehouses = useCallback(
    (page: number, filters: WarehouseFilterType) => {
      request<IWarehouse[]>(`/api/warehouses?page=${page}${makeFilterString(filters)}`).then((res) => {
        if (!res) return;
        setWarehouses(res);
        checkCanLoad(res);
      });
    },
    [request, checkCanLoad, makeFilterString]
  );

  const loadMore = useCallback(() => {
    if (canLoad && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [setPage, canLoad, isLoading]);

  useEffect(() => {
    fetchWarehouses(page, warehouseFilters);
  }, [fetchWarehouses, page, warehouseFilters]);

  // TODO намереное пересечение
  const isAdmin = useAdmin();
  const filteredWarehouse = warehouses.filter((warehouses) => isAdmin || warehouses.name !== 'РЦ');

  return {
    isLoading,
    fetchWarehouses,
    warehouses: filteredWarehouse,
    canLoad,
    loadMore,
    setWarehouseFilter,
    warehouseFilters,
  };
};
