import { IWarehouse } from 'entities/Worehouse';

export interface IRoute {
  id: number;
  end_warehouse: number;
  start_warehouse: number;
  user_id: number | null;
  delivery_days: number[];
}

export interface IRouteDetails {
  id: number;
  user_id: number | null;
  delivery_days: number[];
  start_warehouse_id: number;
  end_warehouse_id: number;
  end_warehouse: IWarehouse;
  start_warehouse: IWarehouse;
}
