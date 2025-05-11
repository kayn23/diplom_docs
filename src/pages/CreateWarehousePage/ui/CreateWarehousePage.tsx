import { Button, Typography } from '@mui/joy';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { useFetch } from 'entities/User';
import { IWarehouse } from 'entities/Worehouse';
import { WarehouseForm } from 'features/WarehouseForm';
import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { getRouteWarehouseInfo } from 'shared/const/router';
import { classNames } from 'shared/lib/classNames/classNames';

interface CreateWarehousePageProps {
  className?: string;
}

export const CreateWarehousePage: FC<CreateWarehousePageProps> = (props) => {
  const { t } = useTranslation('warehouses');

  const { className } = props;

  const [warehouse, setWarehouse] = useState<Partial<IWarehouse>>({});

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [inputRef]);

  const navigate = useNavigate();
  const { request, isLoading } = useFetch();
  const onSave = useCallback(() => {
    request<IWarehouse>('/api/warehouses', {
      method: 'post',
      body: {
        ...warehouse,
        city_id: warehouse.full_city?.id,
      },
    }).then((res) => {
      if (!res) return;
      navigate(getRouteWarehouseInfo(res.id));
    });
  }, [warehouse, request, navigate]);

  return (
    <AccountLayout className={classNames('CreateWarehousePage', { additional: [className] })}>
      <Typography level="h1">{t('CreateWarehousePage.title')}</Typography>
      <WarehouseForm
        warehouse={warehouse}
        onUpdate={setWarehouse}
        inputRef={inputRef}
        disabled={isLoading}
      >
        <Button
          onClick={onSave}
          disabled={isLoading}
        >
          {t('CreateWarehousePage.saveBtn')}
        </Button>
      </WarehouseForm>
    </AccountLayout>
  );
};

export default CreateWarehousePage;
