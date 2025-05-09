export interface IRoute {
  id: number;
  end_warehouse: number;
  start_warehouse: number;
  user_id: number | null;
  delivery_days: number[];
}
