import { memo, Suspense, useCallback, type FC } from 'react';
import { Route, Routes } from 'react-router';
import { AppRoutesProps } from 'shared/types/router';
import { routerConfig } from '../config/routerConfig';
import { PageLoader } from 'widgets/PageLoader';

export const AppRouter: FC = memo(() => {
  const renderWithWrapper = useCallback((router: AppRoutesProps) => {
    // TODO need fallback element
    const element = (
      <Suspense key={router.path} fallback={<PageLoader />}>
        {router.element}
      </Suspense>
    );

    return <Route key={router.path} path={router.path} element={element} />;
  }, []);
  return <Routes>{Object.values(routerConfig).map((route) => renderWithWrapper(route))}</Routes>;
});
