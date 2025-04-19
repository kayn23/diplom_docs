import { IUser } from 'entities/User';
import { IWarehouse } from 'entities/Worehouse';
import { status } from '../model/config/status';

export interface IOrder {
  id: number;
  sender_id: number;
  receiver_id: number | null;
  start_warehouse_id: number;
  end_warehouse_id: number;
  price: string | null;
  status: status;
  created_at: string;
  update_at: string;
  sender: IUser;
  receiver: IUser | null;
  start_warehouse: IWarehouse;
  end_warehouse: IWarehouse;
  delivery_date?: string;
}

export interface ICreateOrderParams {
  sender_id: number;
  receiver_id: number;
  start_warehouse_id: number;
  end_warehouse_id: number;
}
