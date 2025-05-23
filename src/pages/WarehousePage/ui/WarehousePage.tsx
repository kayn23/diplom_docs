import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WarehousePage.module.scss';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { useParams } from 'react-router';
import { useGetWarehouse, WarehouseInfoCard } from 'entities/Worehouse';
import { BackLink } from 'shared/ui/BackLink';
import { Chip, Divider, Stack, Typography } from '@mui/joy';
import { RouteInfo } from './RouteInfo';
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage';

interface WarehousePageProps {
  className?: string;
}

export const WarehousePage: FC<WarehousePageProps> = (props) => {
  const { t } = useTranslation('warehouses');

  const { className } = props;
  const { warehouseId } = useParams();

  const { warehouse, getWarehouseInfo, error } = useGetWarehouse(warehouseId!);

  const onChangeRouteAssigne = useCallback(() => {
    getWarehouseInfo();
  }, [getWarehouseInfo]);

  return (
    <AccountLayout className={classNames(cls.WarehousePage, { additional: [className] })}>
      <BackLink />
      <Typography level="h1">{t('WarehousePage.title', { warehouseId })}</Typography>
      {warehouse && (
        <Stack gap="8px">
          <WarehouseInfoCard warehouse={warehouse} />
          <Divider>
            <Chip color="neutral">{t('WarehousePage.routesTitle')}</Chip>
          </Divider>
          <RouteInfo
            route={warehouse.to_route}
            onUpdated={onChangeRouteAssigne}
            notFoundErrorText={t('WarehousePage.to_route.not_found')}
            warningText={t('WarehousePage.to_route.warning')}
            title={t('WarehousePage.to_route.title')}
          />
          <RouteInfo
            route={warehouse.from_route}
            onUpdated={onChangeRouteAssigne}
            notFoundErrorText={t('WarehousePage.from_route.not_found')}
            warningText={t('WarehousePage.from_route.warning')}
            title={t('WarehousePage.from_route.title')}
          />
        </Stack>
      )}
      {error && <ErrorMessage error={error} />}
    </AccountLayout>
  );
};

export default WarehousePage;
