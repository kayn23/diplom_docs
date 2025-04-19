import { AboutPage } from 'pages/AboutPage';
import { CreateOrderPage } from 'pages/CreateOrderPage';
import { EditOrderPage } from 'pages/EditOrderPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { OrderPage } from 'pages/OrderPage';
import { OrdersPage } from 'pages/OrdersPage';
import {
  AppRoutes,
  getRouteAbout,
  getRouteCreateOrder,
  getRouteMain,
  getRouteNotFound,
  getRouteOrder,
  getRouteOrders,
  getRouterEditOrder,
} from 'shared/const/router';
import { AppRoutesProps } from 'shared/types/router';

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
  [AppRoutes.ORDERS]: {
    path: getRouteOrders(),
    element: <OrdersPage />,
  },
  [AppRoutes.ORDER]: {
    path: getRouteOrder(),
    element: <OrderPage />,
  },
  [AppRoutes.CREATE_ORDER]: {
    path: getRouteCreateOrder(),
    element: <CreateOrderPage />,
  },
  [AppRoutes.EDIT_ORDER]: {
    path: getRouterEditOrder(),
    element: <EditOrderPage />,
  },
};
