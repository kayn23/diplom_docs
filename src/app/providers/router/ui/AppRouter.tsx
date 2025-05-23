import { memo, Suspense, useCallback, type FC } from 'react';
import { Route, Routes } from 'react-router';
import { AppRoutesProps } from 'shared/types/router';
import { routerConfig } from '../config/routerConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequiredAuth';

export const AppRouter: FC = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.authOnly || route.roles ? (
          <RequireAuth
            authOnly={route.authOnly}
            roles={route.roles}
          >
            {route.element}
          </RequireAuth>
        ) : (
          route.element
        )}
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={element}
      />
    );
  }, []);

  return <Routes>{Object.values(routerConfig).map((route) => renderWithWrapper(route))}</Routes>;
});
