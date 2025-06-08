import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Stack } from '@mui/joy';
import { CitySelector } from 'entities/City';
import { WarehouseFilterType } from 'entities/Worehouse/lib/useGetWarehouseList';

interface WarehousesFinderProps {
  className?: string;
  onChange?: (key: keyof WarehouseFilterType, vaule: WarehouseFilterType[keyof WarehouseFilterType]) => void;
}

export const WarehousesFinder: FC<WarehousesFinderProps> = memo((props) => {
  const { t } = useTranslation('warehouses');

  const { className, onChange } = props;

  return (
    <Stack
      className={classNames('WarehousesFinder', { additional: [className] })}
      gap="8px"
    ></Stack>
  );
});
