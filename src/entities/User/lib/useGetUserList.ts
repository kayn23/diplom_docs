import { IUser, Roles, useFetch } from 'entities/User';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

export type UserFilterType = Partial<{
  roles: Roles[];
  email_or_full_name_cont: string;
}>;

export const useGetUserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userFilters, setUserFilters] = useState<UserFilterType>({});

  const { isLoading, request } = useFetch();

  const [page, setPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);

  const checkCanLoad = useCallback(
    (orders: IUser[]) => {
      if (orders.length < 30) {
        setCanLoad(false);
      } else {
        setPage(page + 1);
      }
    },
    [setCanLoad, setPage, page]
  );

  const makeFilterString = useCallback((filters: UserFilterType) => {
    let res = '';
    if (filters.roles) {
      res += '&' + filters.roles.map((role) => `q[roles_name_in][]=${role}`).join('&');
    }
    if (filters.email_or_full_name_cont) {
      res += `&q[email_or_full_name_cont]=${filters.email_or_full_name_cont}`;
    }

    return res;
  }, []);

  const fetchUsers = useCallback(
    (page: number, filters: UserFilterType = {}) => {
      request<IUser[]>(`/api/users?page=${page}${makeFilterString(filters)}`).then((res) => {
        if (!res) return;
        setUsers(res);
        checkCanLoad(res);
      });
    },
    [request, checkCanLoad, makeFilterString]
  );

  const setUserFilter = useDebouncedCallback(
    (key: keyof UserFilterType, value: UserFilterType[keyof UserFilterType]) => {
      setUserFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    300
  );

  useEffect(() => {
    fetchUsers(page, userFilters);
  }, [fetchUsers, page, userFilters]);

  return {
    users,
    isLoading,
    canLoad,
    fetchUsers,
    setUserFilter,
    userFilters,
  };
};
