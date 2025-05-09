import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WarehousesPage.module.scss';
import { Divider, Input, Stack, Typography } from '@mui/joy';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { useGetWarehouseList, WarehouseInfoCard } from 'entities/Worehouse';
import { useAdmin } from 'entities/User';

interface WarehousesPageProps {
  className?: string;
}

export const WarehousesPage: FC<WarehousesPageProps> = (props) => {
  const { t } = useTranslation('warehouses');

  const { className } = props;

  const { warehouses, isLoading, setWarehouseFilter } = useGetWarehouseList();
  const isAdmin = useAdmin();

  return (
    <AccountLayout className={classNames(cls.WarehousesPage, { additional: [className] })}>
      <Typography level="h1">{t('WarehousesPage.title')}</Typography>

      <Stack
        direction="column"
        gap="8px"
      >
        <Input
          onChange={(e) => setWarehouseFilter('name_or_address_or_city_name_cont', e.target.value)}
          placeholder={t('WarehousesPage.filter_placeholder')}
        />
        <Divider />
        {!isLoading && (
          <>
            {warehouses.length > 0 ? (
              warehouses.map((warehouse) => (
                <WarehouseInfoCard
                  warehouse={warehouse}
                  key={warehouse.id}
                  showMoreButton={isAdmin}
                />
              ))
            ) : (
              <Typography level="body-lg">{t('WarehousesPage.not_found')}</Typography>
            )}
          </>
        )}
      </Stack>
    </AccountLayout>
  );
};

export default WarehousesPage;
