import { AboutPage } from 'pages/AboutPage';
import { CreateOrderPage } from 'pages/CreateOrderPage';
import { CreateWarehousePage } from 'pages/CreateWarehousePage';
import { EditOrderPage } from 'pages/EditOrderPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { OrderPage } from 'pages/OrderPage';
import { OrdersPage } from 'pages/OrdersPage';
import { UserCreatePage } from 'pages/UserCreatePage';
import { UserInfoPage } from 'pages/UserInfoPage';
import { UsersPage } from 'pages/UsersPage';
import { WarehousePage } from 'pages/WarehousePage';
import { WarehousesPage } from 'pages/WarehousesPage';
import {
  AppRoutes,
  getRouteAbout,
  getRouteCreateOrder,
  getRouteCreateUser,
  getRouteCreateWarehouse,
  getRouteMain,
  getRouteNotFound,
  getRouteOrder,
  getRouteOrders,
  getRouterEditOrder,
  getRouteShowUser,
  getRouteUserList,
  getRouteWarehouseInfo,
  getRouteWarehouseList,
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
  [AppRoutes.USER_LIST]: {
    path: getRouteUserList(),
    element: <UsersPage />,
  },
  [AppRoutes.CREATE_USER]: {
    path: getRouteCreateUser(),
    element: <UserCreatePage />,
  },
  [AppRoutes.SHOW_USER]: {
    path: getRouteShowUser(),
    element: <UserInfoPage />,
  },
  [AppRoutes.WAREHOUSE_LIST]: {
    path: getRouteWarehouseList(),
    element: <WarehousesPage />,
  },
  [AppRoutes.WAREHOUSE_INFO]: {
    path: getRouteWarehouseInfo(),
    element: <WarehousePage />,
  },
  [AppRoutes.WAREHOUSE_CREATE]: {
    path: getRouteCreateWarehouse(),
    element: <CreateWarehousePage />,
  },
};
