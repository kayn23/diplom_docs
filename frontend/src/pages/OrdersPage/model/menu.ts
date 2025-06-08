import { Roles } from 'entities/User';
import {
  getRouteCreateOrder,
  getRouteCreateUser,
  getRouteCreateWarehouse,
  getRouteOrders,
  getRouteShippings,
  getRouteUploadCargo,
  getRouteUserList,
  getRouteWarehouseList,
} from 'shared/const/router';

export interface IMenuItem {
  label: string;
  link: string;
  roles?: Roles[];
}

export interface IMenuGroup {
  label: string;
  childrens: IMenuItem[];
  roles?: Roles[];
}

export type MenuType = IMenuGroup[];

export const menu: MenuType = [
  {
    label: 'menu.orders.label',
    childrens: [
      {
        label: 'menu.orders.list',
        link: getRouteOrders(),
      },
      {
        label: 'menu.orders.create',
        link: getRouteCreateOrder(),
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    label: 'menu.users.label',
    roles: ['admin', 'manager'],
    childrens: [
      {
        label: 'menu.users.list',
        link: getRouteUserList(),
      },
      {
        label: 'menu.users.create',
        link: getRouteCreateUser(),
      },
    ],
  },
  {
    label: 'menu.warehouses.label',
    childrens: [
      {
        label: 'menu.warehouses.list',
        link: getRouteWarehouseList(),
      },
      {
        label: 'menu.warehouses.create',
        link: getRouteCreateWarehouse(),
        roles: ['admin'],
      },
    ],
  },
  {
    label: 'menu.shippings.label',
    roles: ['admin', 'courier'],
    childrens: [
      {
        label: 'menu.shippings.list',
        link: getRouteShippings(),
      },
    ],
  },
  {
    label: 'menu.cargos.label',
    roles: ['admin', 'manager'],
    childrens: [
      {
        label: 'menu.cargos.upload',
        link: getRouteUploadCargo(),
      },
    ],
  },
];
