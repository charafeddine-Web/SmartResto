import {Order} from '../../../shared/models/Order.model';

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

export const InitialOrdersState: OrdersState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null
}
