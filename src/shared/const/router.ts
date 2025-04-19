export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
  ORDERS = 'orders',
  ORDER = 'order',
  CREATE_ORDER = 'create_order',
  EDIT_ORDER = 'edit_order',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';

export const getRouteOrders = () => '/orders';
export const getRouteOrder = (id: string | number = ':orderId') => `/orders/${id}`;
export const getRouteCreateOrder = () => '/orders/new';
export const getRouterEditOrder = (id: string | number = ':orderId') => `/orders/${id}/edit`;

export const getRouteNotFound = () => '*';
