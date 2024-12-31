import { memo, Suspense, useCallback, type FC } from 'react';
import { Route, Routes } from 'react-router';
import { AppRoutesProps } from 'shared/types/router';
import { routerConfig } from '../config/routerConfig';
import { PageLoading } from 'widgets/PageLoading';

export const AppRouter: FC = memo(() => {
  const renderWithWrapper = useCallback((router: AppRoutesProps) => {
    // TODO need fallback element
    const element = <Suspense fallback={<PageLoading />}>{router.element}</Suspense>;

    return <Route key={router.path} path={router.path} element={element} />;
  }, []);
  return <Routes>{Object.values(routerConfig).map((route) => renderWithWrapper(route))}</Routes>;
});
