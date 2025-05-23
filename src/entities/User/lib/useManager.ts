import { useSelector } from 'react-redux';
import { getUserRoles } from '../model/selectors/getUserRoles';

export const useManager = () => {
  const roles = useSelector(getUserRoles);
  const isRole = !!roles && roles.includes('manager');
  return isRole;
};
