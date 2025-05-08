import { SyntheticEvent, useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from 'entities/User/utils/useFetch';
import { Autocomplete } from '@mui/joy';
import { IUser } from '../../types/user';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

interface UserSelectorProps {
  value?: IUser | null | undefined;
  onSelect?: (value: IUser | null) => void;
  placeholder?: string;
}

export const UserSelector: FC<UserSelectorProps> = (props) => {
  const { t } = useTranslation();
  const { value, onSelect, placeholder = t('users.selectAutocomplete.placeholder') } = props;

  const { request, isLoading } = useFetch();

  const [users, setUsers] = useState<IUser[]>([]);

  // TODO переделать на использование useGetUserList
  const getUsers = useCallback(
    (searchString = '') => {
      const search = searchString !== '' ? `&q[email_or_full_name_cont]=${searchString}` : '';
      request<IUser[]>(`/api/users?per_page=100${search}`).then((res) => {
        if (res) setUsers(res);
      });
    },
    [request, setUsers]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onChange = useCallback(
    (_e: SyntheticEvent, value: IUser | null) => {
      onSelect?.(value);
    },
    [onSelect]
  );

  const searchRequest = useDebouncedCallback((value: string) => {
    getUsers(value);
  }, 500);

  const onInputChange = useCallback(
    (_e: SyntheticEvent, inputString: string) => {
      searchRequest(inputString);
    },
    [searchRequest]
  );

  const displayedOptions = useMemo(() => {
    if (value && !users.some((u) => u.id === value.id)) {
      return [value, ...users];
    }
    return users;
  }, [users, value]);

  return (
    <Autocomplete
      value={value}
      options={displayedOptions}
      getOptionLabel={(option) =>
        `${option.lastname || ''} ${option.firstname || ''} ${option.lastname || ''} ${option.email}`
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      placeholder={placeholder}
      loading={isLoading}
      onChange={onChange}
      onInputChange={onInputChange}
    />
  );
};
