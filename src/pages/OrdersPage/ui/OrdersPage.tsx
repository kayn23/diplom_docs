import type { FC } from 'react';
import { Typography } from '@mui/joy';
import { useGetOrderList } from 'widgets/OrderList/model/service/useGetOrderList';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { useTranslation } from 'react-i18next';
import { OrderPreviewCard } from 'entities/Order';
import { ListSkeleton } from './ListSkeleton';
import { OrdersSidebar } from './OrdersSidebar';

interface OrdersPageProps {
  className?: string;
}

export const OrdersPage: FC<OrdersPageProps> = () => {
  const { isLoading, orders } = useGetOrderList();
  const { t } = useTranslation();

  return (
    <AccountLayout sidebar={<OrdersSidebar />}>
      <Typography level="h1">{t('pages.orders')}</Typography>
      {isLoading && <ListSkeleton />}

      {orders.map((order) => (
        <OrderPreviewCard
          key={order.id}
          order={order}
        />
      ))}
    </AccountLayout>
  );
};

export default OrdersPage;
