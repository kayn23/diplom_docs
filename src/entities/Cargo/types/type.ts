export const CargoStatus = ['accepted', 'issued'] as const;
export type CargoStatusType = (typeof CargoStatus)[number];

export interface ICargo {
  id: number;
  size: string;
  dimensions: string;
  description: string;
  qrcode?: string;
  order_id: number;
  status: CargoStatusType;
}
