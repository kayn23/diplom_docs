import { memo, SyntheticEvent, useCallback, useMemo, type FC } from 'react';
import { ICity } from '../types/city';
import { useGetCities } from '../lib/useGetCities';
import { Autocomplete } from '@mui/joy';
import { useTranslation } from 'react-i18next';

interface CitySelectorProps {
  value?: ICity;
  onSelect?: (value: ICity | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const CitySelector: FC<CitySelectorProps> = memo((props) => {
  const { t } = useTranslation();

  const { value, onSelect, disabled, placeholder = t('citySelector.placeholder') } = props;

  const { setCityFilter, cities, isLoading } = useGetCities();

  const onInputChange = useCallback(
    (_e: SyntheticEvent, value: string) => {
      setCityFilter('name_cont', value);
    },
    [setCityFilter]
  );

  const displayedOptions = useMemo(() => {
    if (value && !cities.some((u) => u.id === value.id)) {
      return [value, ...cities];
    }
    return cities;
  }, [cities, value]);

  const onChange = useCallback(
    (_e: SyntheticEvent, value: ICity | null) => {
      console.log(value);
      onSelect?.(value);
    },
    [onSelect]
  );

  return (
    <Autocomplete
      value={value}
      options={displayedOptions}
      onInputChange={onInputChange}
      disabled={disabled}
      loading={isLoading}
      placeholder={placeholder}
      onChange={onChange}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  );
});
