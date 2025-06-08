import { useState, useCallback } from 'react';

export const usePaginationHelpers = <T = unknown>(pageSize: number = 30) => {
  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);

  const checkCanLoad = useCallback(
    (value: T[]) => {
      if (value.length < pageSize) {
        setCanLoad(false);
      }
    },
    [pageSize]
  );

  return {
    page,
    setPage,
    canLoad,
    checkCanLoad,
  };
};
