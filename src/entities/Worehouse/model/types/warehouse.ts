import { IRoute } from 'entities/Route';

export interface IWarehouse {
  id: number;
  name: string;
  address: string;
  city_id: number;
  city: string;
  active: boolean;
}

export interface IWarehouseDetails extends IWarehouse {
  from_route: IRoute;
  to_route: IRoute;
}
