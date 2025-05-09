import { useState, useCallback, useEffect } from 'react';
import { ICity } from '../types/city';
import { ofetch } from 'ofetch';
import { BASE_URL } from 'shared/const/api';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

export type CityFilterType = {
  name_cont?: string;
};

export const useGetCities = () => {
  const [cities, setSities] = useState<ICity[]>([]);
  const [cityFilters, setCityFilters] = useState<CityFilterType>({});

  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const checkCanLoad = useCallback(
    (orders: ICity[]) => {
      if (orders.length < 30) {
        setCanLoad(false);
      }
    },
    [setCanLoad]
  );

  const makeFilterString = useCallback((filters: CityFilterType) => {
    let res = '';
    if (filters.name_cont) {
      res += `&q[name_cont]=${filters.name_cont}`;
    }
    return res;
  }, []);

  const setCityFilter = useDebouncedCallback(
    (key: keyof CityFilterType, value: CityFilterType[keyof CityFilterType]) => {
      setCityFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
      setPage(1);
      setCanLoad(true);
    },
    300
  );

  const getCities = useCallback(
    (page: number, filters: CityFilterType = {}) => {
      setIsLoading(true);
      ofetch<ICity[]>(`${BASE_URL}/api/cities?page=${page}${makeFilterString(filters)}`)
        .then((res) => {
          setSities(res);
          checkCanLoad(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [makeFilterString, checkCanLoad]
  );

  const loadMore = useCallback(() => {
    if (canLoad && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [setPage, canLoad, isLoading]);

  useEffect(() => {
    getCities(page, cityFilters);
  }, [getCities, page, cityFilters]);

  return {
    cities,
    canLoad,
    getCities,
    loadMore,
    cityFilters,
    setCityFilter,
    isLoading,
  };
};
