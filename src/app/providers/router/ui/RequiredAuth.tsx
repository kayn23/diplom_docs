import { Roles, getIsAuth, getUserRoles } from 'entities/User';
import { FC, useRef, useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router';

interface RequireAuthProps {
  children: ReactNode;
  authOnly?: boolean;
  roles?: Roles[];
}

export const RequireAuth: FC<RequireAuthProps> = (props) => {
  const { children, roles = [], authOnly } = props;
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);
  const userRoles = useSelector(getUserRoles);

  const allowedLocationRef = useRef(location.pathname); // Хранит последний разрешенный маршрут
  const isRolesLoaded = userRoles !== undefined && userRoles !== null;

  const hasRequiredRole = roles.length ? isRolesLoaded && roles.some((role) => userRoles?.includes(role)) : true;

  // Обновляем allowedLocationRef только если текущий маршрут доступен
  useEffect(() => {
    if (isAuth && hasRequiredRole) {
      allowedLocationRef.current = location.pathname;
    }
  }, [isAuth, location.pathname, hasRequiredRole]);

  if (authOnly && !isAuth) {
    // Если требуется авторизация, но пользователь не авторизован → на главную
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  if (roles.length > 0 && !isRolesLoaded) {
    // Если роли еще не загружены → ждем (можно добавить лоадер)
    return null;
  }

  if (roles.length > 0 && !hasRequiredRole) {
    // Если роли есть, но недостаточно → возвращаем на последний разрешенный маршрут
    return (
      <Navigate
        to={allowedLocationRef.current}
        replace
      />
    );
  }

  return children;
};
