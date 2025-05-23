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
  WAREHOUSE_CREATE = 'warehouse_create',

  SHIPPINGS_LIST = 'shippings_list',
  SHIPPING_INFO = 'shipping_info',

  UPLOAD_CARGO_TO_WAREHOUSE = 'upload_cargo_to_warehouse',
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
export const getRouteCreateWarehouse = () => '/warehouses/new';
export const getRouteWarehouseInfo = (id: string | number = ':warehouseId') => `/warehouses/${id}`;

export const getRouteShippings = () => '/shippings';
export const getRouteShipping = (id: string | number = ':shippingId') => `/shippings/${id}`;

export const getRouteUploadCargo = () => '/upload_cargo';

export const getRouteNotFound = () => '*';
