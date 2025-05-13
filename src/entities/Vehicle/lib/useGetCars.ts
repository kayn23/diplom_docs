import { useCallback, useEffect, useState } from 'react';
import { IVehicle } from '../types/vehicle';
import { useFetch } from 'entities/User';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

export type CarFilters = Partial<{
  name_eq: string;
  active: boolean;
}>;

export const useGetCars = (userId: number) => {
  const [cars, setCars] = useState<IVehicle[]>([]);
  const [carFilters, setCarFilters] = useState<CarFilters>({});

  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);
  const { request, isLoading } = useFetch();

  const checkCanLoad = useCallback(
    (orders: IVehicle[]) => {
      if (orders.length < 30) {
        setCanLoad(false);
      }
    },
    [setCanLoad]
  );
  const setCarFilter = useDebouncedCallback((key: keyof CarFilters, value: CarFilters[keyof CarFilters]) => {
    setCarFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
    setCanLoad(true);
  }, 300);

  const makeFilterString = useCallback((filters: CarFilters) => {
    let res = '';
    if (filters.name_eq) {
      res += `&q[name_eq]=${filters.name_eq}`;
    }
    if (filters.active) {
      res += 'q[active_eq=true';
    }
    return res;
  }, []);

  const getCars = useCallback(
    (page: number, filters: CarFilters) => {
      request<IVehicle[]>(`/api/users/${userId}/cars?page=${page}${makeFilterString(filters)}`).then((res) => {
        if (!res) return;
        setCars(res);
        checkCanLoad(res);
      });
    },
    [request, userId, checkCanLoad, makeFilterString]
  );

  const loadMore = useCallback(() => {
    if (canLoad && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [setPage, canLoad, isLoading]);

  const onReload = useCallback(() => {
    getCars(page, carFilters);
  }, [getCars, page, carFilters]);

  useEffect(() => {
    getCars(page, carFilters);
  }, [getCars, page, carFilters]);

  return {
    cars,
    loadMore,
    setCarFilter,
    canLoad,
    isLoading,
    carFilters,
    getCars,
    onReload,
  };
};
