import { useCallback, useMemo } from 'react';
import { getRouteOrders, getRouteShippings } from 'shared/const/router';
import { useCourier } from './useCourier';
import { useHightRole } from './useHightRole';
import { Roles } from '../types/roles';

export const useGeneralLink = () => {
  const hightRole = useHightRole();
  const isCourier = useCourier();

  const link = useMemo(() => {
    if (hightRole) {
      return getRouteOrders();
    }
    if (isCourier) {
      return getRouteShippings();
    }
    return getRouteOrders();
  }, [hightRole, isCourier]);

  const getLink = useCallback((roles: Roles[]) => {
    if ((['admin', 'manager'] as Roles[]).some((role) => roles.includes(role))) {
      return getRouteOrders();
    }
    if (roles.includes('courier')) {
      return getRouteShippings();
    }
    return getRouteOrders();
  }, []);

  return { link, getLink };
};
