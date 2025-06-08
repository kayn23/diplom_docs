import { memo, Ref, useCallback, type FC, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { IWarehouse } from '../../model/types/warehouse';
import { Autocomplete } from '@mui/joy';
import { useGetWarehouseList } from '../../lib/useGetWarehouseList';

interface WarehouseSelectAutocompletuProps {
  onSelect?: (value: IWarehouse | null) => void;
  value?: IWarehouse | null;
  showAllWarehouses?: boolean;
  hideNoAssignedRoutes?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
}

export const WarehouseSelectAutocompletu: FC<WarehouseSelectAutocompletuProps> = memo((props) => {
  const { onSelect, hideNoAssignedRoutes = false, showAllWarehouses = false, value, inputRef, className } = props;
  const { t } = useTranslation();

  const additionalFilters = {
    ...(hideNoAssignedRoutes && { with_assigned_routes: true }),
  };

  const { warehouses, setWarehouseFilter, isLoading } = useGetWarehouseList(additionalFilters, {
    showAllWarehouses,
  });

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
      value={value}
      options={warehouses}
      placeholder={t('warehouses.selectAutocomplete.placeholder')}
      getOptionLabel={(option) => `${option.name} ${option.city} ${option.address}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChange}
      onInputChange={onInputChange}
      loading={isLoading}
      slotProps={{
        input: {
          ref: inputRef,
        },
      }}
      className={className}
    />
  );
});
