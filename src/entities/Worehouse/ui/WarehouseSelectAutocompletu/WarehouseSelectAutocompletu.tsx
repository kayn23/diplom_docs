import { memo, useCallback, type FC, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { IWarehouse } from '../../model/types/warehouse';
import { Autocomplete } from '@mui/joy';
import { useGetWarehouseList } from '../../lib/useGetWarehouseList';

interface WarehouseSelectAutocompletuProps {
  onSelect?: (value: IWarehouse | null) => void;
}

export const WarehouseSelectAutocompletu: FC<WarehouseSelectAutocompletuProps> = memo((props) => {
  const { onSelect } = props;
  const { t } = useTranslation();

  const { warehouses, setWarehouseFilter, isLoading } = useGetWarehouseList();

  const onChange = useCallback(
    (_e: SyntheticEvent, value: IWarehouse | null) => {
      onSelect?.(value);
    },
    [onSelect]
  );

  const onInputChange = useCallback(
    (_e: SyntheticEvent, inputString: string) => {
      setWarehouseFilter('name_or_address_or_city_name_cont', inputString);
    },
    [setWarehouseFilter]
  );

  return (
    <Autocomplete
      options={warehouses}
      placeholder={t('warehouses.selectAutocomplete.placeholder')}
      getOptionLabel={(option) => `${option.name} ${option.city} ${option.address}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChange}
      onInputChange={onInputChange}
      loading={isLoading}
    />
  );
});
