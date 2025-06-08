import { useSelector } from 'react-redux';
import { getUserRoles } from '../model/selectors/getUserRoles';

export const useCourier = () => {
  const roles = useSelector(getUserRoles);
  const isCourier = !!roles && roles.includes('courier');
  return isCourier;
};
