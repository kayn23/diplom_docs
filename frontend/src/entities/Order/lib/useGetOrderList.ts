import { status } from 'entities/Order';
import { IOrder } from 'entities/Order/types/order';
import { defaultMakeFilterString, usePaginatedApi } from 'shared/lib/usePaginatedFetch';

export type OrderFilters = Partial<{
  status: status[];
  sender_id: number;
  receiver_id: number;
  status_not: status[];
  id: string;
}>;

const makeFilterString = (filters: OrderFilters) => {
  return defaultMakeFilterString({
    ...filters,
    status_not: filters.status_not?.filter((f) => !filters.status?.includes(f)) || [],
  });
};

export const useGetOrders = () =>
  usePaginatedApi<IOrder, OrderFilters>({
    endpoint: '/api/orders',
    initialFilters: {
      status: ['created', 'wait_payment', 'paid', 'in_delivery', 'awaiting_pickup'],
      status_not: ['completed'],
    },
    makeFilterString,
  });
