import { AboutPage } from 'pages/AboutPage';
import { CreateOrderPage } from 'pages/CreateOrderPage';
import { CreateWarehousePage } from 'pages/CreateWarehousePage';
import { EditOrderPage } from 'pages/EditOrderPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { OrderPage } from 'pages/OrderPage';
import { OrdersPage } from 'pages/OrdersPage';
import { ShippingPage } from 'pages/ShippingPage';
import { ShippingsPage } from 'pages/ShippingsPage';
import { UploadCargoToWarehousePage } from 'pages/UploadCargoToWarehousePage';
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
  getRouteShipping,
  getRouteShippings,
  getRouteShowUser,
  getRouteUploadCargo,
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
    authOnly: true,
  },
  [AppRoutes.ORDER]: {
    path: getRouteOrder(),
    element: <OrderPage />,
    authOnly: true,
  },
  [AppRoutes.CREATE_ORDER]: {
    path: getRouteCreateOrder(),
    element: <CreateOrderPage />,
    roles: ['manager', 'admin'],
  },
  [AppRoutes.EDIT_ORDER]: {
    path: getRouterEditOrder(),
    element: <EditOrderPage />,
    roles: ['manager', 'admin'],
  },

  [AppRoutes.USER_LIST]: {
    path: getRouteUserList(),
    element: <UsersPage />,
    roles: ['manager', 'admin'],
  },
  [AppRoutes.CREATE_USER]: {
    path: getRouteCreateUser(),
    element: <UserCreatePage />,
    roles: ['manager', 'admin'],
  },
  [AppRoutes.SHOW_USER]: {
    path: getRouteShowUser(),
    element: <UserInfoPage />,
    roles: ['manager', 'admin'],
  },

  [AppRoutes.WAREHOUSE_LIST]: {
    path: getRouteWarehouseList(),
    element: <WarehousesPage />,
  },
  [AppRoutes.WAREHOUSE_INFO]: {
    path: getRouteWarehouseInfo(),
    element: <WarehousePage />,
    roles: ['admin'],
  },
  [AppRoutes.WAREHOUSE_CREATE]: {
    path: getRouteCreateWarehouse(),
    element: <CreateWarehousePage />,
    roles: ['admin'],
  },

  [AppRoutes.SHIPPINGS_LIST]: {
    path: getRouteShippings(),
    element: <ShippingsPage />,
    roles: ['admin', 'courier'],
  },
  [AppRoutes.SHIPPING_INFO]: {
    path: getRouteShipping(),
    element: <ShippingPage />,
    roles: ['admin', 'courier'],
  },

  [AppRoutes.UPLOAD_CARGO_TO_WAREHOUSE]: {
    path: getRouteUploadCargo(),
    element: <UploadCargoToWarehousePage />,
    roles: ['admin', 'manager'],
  },
};
