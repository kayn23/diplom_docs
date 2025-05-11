import { useCallback, useEffect, useState } from 'react';
import { IWarehouse } from '../model/types/warehouse';
import { useFetch } from 'entities/User';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

export type WarehouseFilterType = Partial<{
  search: string;
  city_id_eq: { id: number; name: string };
  name_or_address_or_city_name_cont: string;
  with_assigned_routes: boolean;
  with_unassigned_or_no_routes: boolean;
}>;

export const useGetWarehouseList = (initFilters: WarehouseFilterType = {}) => {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [warehouseFilters, setWarehouseFilters] = useState<WarehouseFilterType>(initFilters);

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
      console.log(key, value);
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
    if (filters.with_assigned_routes) {
      res += '&q[with_assigned_routes]=true';
    }

    if (filters.with_unassigned_or_no_routes) {
      res += '&q[with_unassigned_or_no_routes]=true';
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

  const filteredWarehouse = warehouses.filter((warehouses) => warehouses.name !== 'РЦ');

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
