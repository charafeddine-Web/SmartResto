import { OrderItem } from './OrderItem.model';

export interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: Date;
}
