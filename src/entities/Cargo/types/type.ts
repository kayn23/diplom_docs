export interface ICargo {
  id: number;
  size: string;
  dimensions: string;
  description: string;
  qrcode?: string;
  order_id: number;
}
