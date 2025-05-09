export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
  ORDERS = 'orders',
  ORDER = 'order',
  CREATE_ORDER = 'create_order',
  EDIT_ORDER = 'edit_order',

  USER_LIST = 'users_list',
  CREATE_USER = 'create_user',
  SHOW_USER = 'show_user',

  WAREHOUSE_LIST = 'warehouses_list',
  WAREHOUSE_INFO = 'warehouse_info',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';

export const getRouteOrders = () => '/orders';
export const getRouteOrder = (id: string | number = ':orderId') => `/orders/${id}`;
export const getRouteCreateOrder = () => '/orders/new';
export const getRouterEditOrder = (id: string | number = ':orderId') => `/orders/${id}/edit`;

export const getRouteUserList = () => '/users';
export const getRouteCreateUser = () => '/users/new';
export const getRouteShowUser = (id: string | number = ':userId') => `/users/${id}`;

export const getRouteWarehouseList = () => '/warehouses';
export const getRouteWarehouseInfo = (id: string | number = ':warehouseId') => `/warehouses/${id}`;

export const getRouteNotFound = () => '*';
