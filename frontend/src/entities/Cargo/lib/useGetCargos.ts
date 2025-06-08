import type { CargoStatusType, ICargo } from '../types/type';
import { usePaginatedApi } from 'shared/lib/usePaginatedFetch';

export type CargoFilter = Partial<{
  status: CargoStatusType;
}>;

const useGetCargoPagination = (orderId: number | string) =>
  usePaginatedApi<ICargo, CargoFilter>({
    endpoint: `/api/orders/${orderId}/cargos`,
  });

export { useGetCargoPagination as useGetCargos };
