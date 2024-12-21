export enum AppRoutes {
  MAIN = 'main',
}

export const getRouteMain = () => '/';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
};
