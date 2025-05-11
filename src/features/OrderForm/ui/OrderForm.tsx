import { memo, useCallback, type FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OrderForm.module.scss';
import { Card, Divider, FormControl, FormLabel } from '@mui/joy';
// TODO не нравится мне пересечение
import { WarehouseSelectAutocompletu } from 'entities/Worehouse';
import { UserSelector } from 'entities/User';
import { ICreateOrderParams } from '../../../entities/Order/types/order';

interface OrderFormProps {
  className?: string;
  formParams: Partial<ICreateOrderParams>;
  onUpdate: (form: Partial<ICreateOrderParams>) => void;
  children?: ReactNode;
}

export const OrderForm: FC<OrderFormProps> = memo((props) => {
  const { t } = useTranslation('orders');

  const { className, formParams, onUpdate, children } = props;

  const onChange = useCallback(
    (field: keyof ICreateOrderParams, value: number) => {
      onUpdate({
        ...formParams,
        [field]: value,
      });
    },
    [formParams, onUpdate]
  );

  return (
    <div className={classNames(cls.OrderForm, { additional: [className] })}>
      <Card>
        {' '}
        <FormControl id="start_warehouse">
          <FormLabel>{t('order.form.startWarehouse.title')}</FormLabel>
          <WarehouseSelectAutocompletu
            hideNoAssignedRoutes={true}
            onSelect={(value) => value && onChange('start_warehouse_id', value.id)}
          />
        </FormControl>
        <FormControl id="end_warehouse">
          <FormLabel>{t('order.form.endWarehouse.title')}</FormLabel>
          <WarehouseSelectAutocompletu
            hideNoAssignedRoutes={true}
            onSelect={(value) => value && onChange('end_warehouse_id', value.id)}
          />
        </FormControl>
        <FormControl id="sender">
          <FormLabel>{t('order.form.sender.title')}</FormLabel>
          <UserSelector
            placeholder={t('order.form.sender.placeholder')}
            onSelect={(value) => value && onChange('sender_id', value.id)}
          />
        </FormControl>
        <FormControl id="receiver">
          <FormLabel>{t('order.form.receiver.title')}</FormLabel>
          <UserSelector
            placeholder={t('order.form.receiver.placeholder')}
            onSelect={(value) => value && onChange('receiver_id', value.id)}
          />
        </FormControl>
        <Divider />
        {children}
      </Card>
    </div>
  );
});
