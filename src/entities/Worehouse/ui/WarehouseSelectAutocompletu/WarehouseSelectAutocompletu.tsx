import { memo, useCallback, useEffect, useState, type FC, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { IWarehouse } from '../../model/types/warehouse';
import { useFetch } from 'entities/User';
import { Autocomplete } from '@mui/joy';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

interface WarehouseSelectAutocompletuProps {
  onSelect?: (value: IWarehouse | null) => void;
}

export const WarehouseSelectAutocompletu: FC<WarehouseSelectAutocompletuProps> = memo((props) => {
  const { onSelect } = props;
  const { t } = useTranslation();

  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const { request, isLoading } = useFetch();

  const getWarehouses = useCallback(
    (page: number = 1, searchString: string = '') => {
      const search = searchString !== '' ? `&q[name_or_address_or_city_name_cont]=${searchString}` : '';
      request<IWarehouse[]>(`/api/warehouses?page=${page}&per_page=500${search}`).then((res) => {
        if (res) setWarehouses(res);
      });
    },
    [request, setWarehouses]
  );

  useEffect(() => {
    getWarehouses(1);
  }, [getWarehouses]);

  const onChange = useCallback(
    (_e: SyntheticEvent, value: IWarehouse | null) => {
      onSelect?.(value);
    },
    [onSelect]
  );

  const searchRequest = useDebouncedCallback((value: string) => {
    getWarehouses(1, value);
  }, 500);

  const onInputChange = useCallback(
    (_e: SyntheticEvent, inputString: string) => {
      searchRequest(inputString);
    },
    [searchRequest]
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
