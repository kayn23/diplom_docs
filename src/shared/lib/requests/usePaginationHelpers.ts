import { useState, useCallback } from 'react';

export const usePaginationHelpers = <T = unknown>() => {
  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);

  const checkCanLoad = useCallback(
    (value: T[]) => {
      if (value.length < 30) {
        setCanLoad(false);
      }
    },
    [setCanLoad]
  );

  return {
    page,
    setPage,
    canLoad,
    checkCanLoad,
  };
};
