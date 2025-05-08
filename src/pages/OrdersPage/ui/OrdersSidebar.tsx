import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OrdersSidebar.module.scss';
import { Divider, Stack, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';
import { getRouteCreateOrder, getRouteCreateUser } from 'shared/const/router';

interface OrdersSidebarProps {
  className?: string;
}

export const OrdersSidebar: FC<OrdersSidebarProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('orders');

  return (
    <Stack
      className={classNames(cls.OrdersSidebar, { additional: [className] })}
      gap="8px"
    >
      <Typography level="h3">{t('OrdersPage.sidebar.search.title')}</Typography>
      <Divider />
      <Typography level="h3">{t('OrdersPage.sidebar.filters.title')}</Typography>
      <Divider />
      <Typography level="h3">{t('OrdersPage.sidebar.actions.title')}</Typography>
      <BaseLink to={getRouteCreateOrder()}>{t('OrdersPage.sidebar.actions.create_order.title')}</BaseLink>
      <BaseLink to={getRouteCreateUser()}>{t('OrdersPage.sidebar.actions.create_user.title')}</BaseLink>
    </Stack>
  );
};
