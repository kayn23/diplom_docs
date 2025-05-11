import { useSelector } from 'react-redux';
import { getUserRoles } from '../model/selectors/getUserRoles';
import { Roles } from '../types/roles';

export const useHightRole = () => {
  const roles = useSelector(getUserRoles);

  const isHightRole = !!roles && (['admin', 'manager'] as Roles[]).some((role) => roles.includes(role));
  return isHightRole;
};
