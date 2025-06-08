import { Stack, Typography } from '@mui/joy';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { IWarehouse } from 'entities/Worehouse';
import { UploadCargo } from 'features/UploadCargo';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useLocalStorage } from 'shared/lib/useLocalStaroge';
import { WarehouseSelector } from './WarehouseSelector';

interface UploadCargoToWarehousePageProps {
  className?: string;
}

export const UploadCargoToWarehousePage: FC<UploadCargoToWarehousePageProps> = (props) => {
  const { t } = useTranslation();

  const { className } = props;

  const [warehouse, setWarehouse] = useLocalStorage<IWarehouse | null>('upload_warehouse', null);

  // const [warehouse, setWarehouse] = useState<IWarehouse | null>();

  return (
    <AccountLayout className={classNames('UploadCargoToWarehousePage', { additional: [className] })}>
      <Typography level="h1">{t('UploadCargoToWarehousePage.title')}</Typography>
      <Stack gap="8px">
        <WarehouseSelector
          warehouse={warehouse}
          onUpdate={setWarehouse}
        />
        {warehouse && <UploadCargo warehouse={warehouse} />}
      </Stack>
    </AccountLayout>
  );
};

export default UploadCargoToWarehousePage;
