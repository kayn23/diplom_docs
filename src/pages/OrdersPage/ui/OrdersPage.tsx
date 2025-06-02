import { type FC } from 'react';
import { Divider, Stack, Typography } from '@mui/joy';
import { AccountLayout } from 'app/layouts/AccountLayout';
import cls from './OrdersPage.module.scss';
import { useTranslation } from 'react-i18next';
import { OrderPreviewCard, useGetOrders } from 'entities/Order';
import { ListSkeleton } from './ListSkeleton';
import { OrderFilter } from 'features/OrderFilters';

interface OrdersPageProps {
  className?: string;
}

export const OrdersPage: FC<OrdersPageProps> = () => {
  // const { isLoading, orders } = useGetOrderList();
  const { data: orders, isLoading, setFilter, filters } = useGetOrders();
  const { t } = useTranslation('orders');

  return (
    <AccountLayout>
      <Typography level="h1">{t('OrdersPage.title')}</Typography>
      {isLoading && <ListSkeleton />}

      <Stack gap="8px">
        <OrderFilter
          value={filters}
          onSetFilter={setFilter}
        />
        <Divider />
        <div className={cls.ListContainer}>
          {!isLoading &&
            orders.map((order) => (
              <OrderPreviewCard
                key={order.id}
                order={order}
              />
            ))}
        </div>
      </Stack>
    </AccountLayout>
  );
};

export default OrdersPage;
