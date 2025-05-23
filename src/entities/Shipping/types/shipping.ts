import { IRouteDetails } from 'entities/Route';
import { IUser } from 'entities/User';

export type ShippingStatus = 'created' | 'loading' | 'delivering' | 'completed';

export interface IShipping {
  id: number;
  route_id: number;
  assignee_id: number;
  status: ShippingStatus;
  date: string;
  assignee: IUser;
  route: IRouteDetails;
  amount_cargos: number;
  unload_cargos: number;
}

export type IShippingDetails = IShipping;
