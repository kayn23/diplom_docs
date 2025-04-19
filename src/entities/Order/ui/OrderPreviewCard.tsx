import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OrderPreviewCard.module.scss';
import { IOrder } from '../types/order';
import { Box, Card, Link, Stack, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { getRouteOrder } from 'shared/const/router';

interface OrderPreviewCardProps {
  className?: string;
  order: IOrder;
}

export const OrderPreviewCard: FC<OrderPreviewCardProps> = (props) => {
  const { className, order } = props;
  const { t } = useTranslation();

  return (
    <Card className={classNames(cls.OrderPreviewCard, { additional: [className] })}>
      <Stack
        direction="row"
        gap={8}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Typography>ID</Typography>
          <Typography>{order.id}</Typography>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Typography color="neutral">{t('orders.previewCard.status.title')}</Typography>
          <Typography level="title-md">{t(`orders.statuses.${order.status}`)}</Typography>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Typography>{t('orders.previewCard.sender.title')}</Typography>
          <Typography>
            <Typography>{t('orders.previewCard.sender.email')}: </Typography>
            <Typography level="title-md">{`${order.sender.email}`}</Typography>
          </Typography>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Typography>{t('orders.previewCard.receiver.title')}</Typography>
          {!order.receiver ? (
            <Typography>{t('orders.previewCard.receiver.not_present')}</Typography>
          ) : (
            <Box>
              <Typography>
                <Typography>{t('orders.previewCard.receiver.email')}: </Typography>
                <Typography level="title-md">{`${order.receiver?.email}`}</Typography>
              </Typography>{' '}
            </Box>
          )}
        </Stack>
        <Link
          color="primary"
          href={getRouteOrder(order.id)}
        >
          {t('orders.previewCard.moreLink')}
        </Link>
      </Stack>
    </Card>
  );
};
