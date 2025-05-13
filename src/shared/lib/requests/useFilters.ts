import { useState } from 'react';
import { useDebouncedCallback } from '../debounceFunction/debounceFunc';

export const useFilters = <T = unknown>(initialFilters: T) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const setFilter = useDebouncedCallback((key: keyof T, value: T[keyof T]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, 300);

  return {
    filters,
    setFilters,
    setFilter,
  };
};
