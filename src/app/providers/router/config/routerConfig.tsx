import { MainPage } from 'pages/MainPage';
import { AppRoutes, getRouteMain } from 'shared/const/router';
import { AppRoutesProps } from 'shared/types/router';

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
};
