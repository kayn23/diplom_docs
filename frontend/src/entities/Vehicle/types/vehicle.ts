export interface IVehicle {
  id: number;
  capacity: number; // объем
  load_capacity: number; // грузоподъемность
  name: string;
  active: boolean;
  user_id: number;
}
