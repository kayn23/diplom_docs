import { Ref, SyntheticEvent, useCallback, useEffect, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@mui/joy';
import { IUser } from '../../types/user';
import { useGetUserList, UserFilterType } from 'entities/User/lib/useGetUserList';

interface UserSelectorProps {
  value?: IUser | null | undefined;
  onSelect?: (value: IUser | null) => void;
  additionalFilter?: UserFilterType;
  placeholder?: string;
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}

export const UserSelector: FC<UserSelectorProps> = (props) => {
  const { t } = useTranslation();
  const {
    value,
    onSelect,
    placeholder = t('users.selectAutocomplete.placeholder'),
    additionalFilter,
    disabled,
    inputRef,
  } = props;

  const { setUserFilter, users, isLoading } = useGetUserList();
  const onChange = useCallback(
    (_e: SyntheticEvent, value: IUser | null) => {
      onSelect?.(value);
    },
    [onSelect]
  );

  const onInputChange = useCallback(
    (_e: SyntheticEvent, inputString: string) => {
      setUserFilter('email_or_full_name_cont', inputString);
    },
    [setUserFilter]
  );

  const displayedOptions = useMemo(() => {
    if (value && !users.some((u) => u.id === value.id)) {
      return [value, ...users];
    }
    return users;
  }, [users, value]);

  useEffect(() => {
    if (!additionalFilter) return;
    Object.entries(additionalFilter).forEach(([key, value]) => {
      setUserFilter(key as keyof UserFilterType, value);
    });
  }, [additionalFilter, setUserFilter]);

  return (
    <Autocomplete
      value={value}
      options={displayedOptions}
      getOptionLabel={(option) =>
        `${option.lastname || ''} ${option.firstname || ''} ${option.surname || ''} ${option.email}`
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      placeholder={placeholder}
      loading={isLoading}
      disabled={disabled}
      onChange={onChange}
      onInputChange={onInputChange}
      selectOnFocus
      slotProps={{
        input: {
          ref: inputRef,
        },
      }}
    />
  );
};
