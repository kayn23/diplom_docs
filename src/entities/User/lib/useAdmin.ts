import { useSelector } from 'react-redux';
import { getUserRoles } from '../model/selectors/getUserRoles';

export const useAdmin = () => {
  const roles = useSelector(getUserRoles);
  const isAdmin = !!roles && roles.includes('admin');
  return isAdmin;
};
