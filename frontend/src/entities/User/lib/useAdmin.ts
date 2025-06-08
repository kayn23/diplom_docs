import { useSelector } from 'react-redux';
import { getUserRoles } from '../model/selectors/getUserRoles';
import { useMemo } from 'react';

export const useAdmin = () => {
  const roles = useSelector(getUserRoles);
  const isAdmin = useMemo(() => !!roles && roles.includes('admin'), [roles]);
  return isAdmin;
};
