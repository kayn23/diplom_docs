import { memo, useCallback, type FC, type ReactNode, type Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IWarehouse } from 'entities/Worehouse';
import { Card, Divider, FormControl, FormLabel, Input } from '@mui/joy';
import { CitySelector } from 'entities/City';

interface WarehouseFormProps {
  children?: ReactNode;
  className?: string;
  warehouse: Partial<IWarehouse>;
  onUpdate?: (warehouse: Partial<IWarehouse>) => void;
  inputRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
}

export const WarehouseForm: FC<WarehouseFormProps> = memo((props) => {
  const { t } = useTranslation('warehouses');

  const { className, warehouse, onUpdate, inputRef, disabled = false, children } = props;

  const onChange = useCallback(
    (field: keyof IWarehouse, value: IWarehouse[keyof IWarehouse] | undefined) => {
      onUpdate?.({
        ...warehouse,
        [field]: value,
      });
    },
    [onUpdate, warehouse]
  );

  return (
    <Card className={classNames('WarehouseForm', { additional: [className] })}>
      <FormControl id="name">
        <FormLabel>{t('warehouseForm.name.label')}</FormLabel>
        <Input
          slotProps={{
            input: {
              ref: inputRef,
            },
          }}
          placeholder={t('warehouseForm.name.placeholder')}
          value={warehouse?.name || ''}
          onChange={(e) => {
            onChange('name', e.target.value);
          }}
          disabled={disabled}
        />
      </FormControl>
      <FormControl id="address">
        <FormLabel>{t('warehouseForm.address.label')}</FormLabel>
        <Input
          placeholder={t('warehouseForm.address.placeholder')}
          value={warehouse?.address || ''}
          onChange={(e) => {
            onChange('address', e.target.value);
          }}
          disabled={disabled}
        />
      </FormControl>
      <FormControl id="city">
        <FormLabel>{t('warehouseForm.city.label')}</FormLabel>
        <CitySelector
          value={warehouse.full_city}
          onSelect={(val) => onChange('full_city', val || undefined)}
          disabled={disabled}
        />
      </FormControl>
      <Divider />
      {children}
    </Card>
  );
});
