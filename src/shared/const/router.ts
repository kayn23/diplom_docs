export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
  ORDERS = 'orders',
  ORDER = 'order',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteOrders = () => '/orders';
export const getRouteOrder = (id: string | number = ':orderId') => `/orders/${id}`;
export const getRouteNotFound = () => '*';
