export type ICargoInShippingStatus = 'wait' | 'loaded_cargo' | 'delivering' | 'delivered';
export interface ICargoInShipping {
  id: number;
  status: ICargoInShippingStatus;
  cargo_id: number;
  shipping_id: number;
}

/*
    state :wait, initial: true
    state :loaded_cargo
    state :delivering
    state :delivered

*/
