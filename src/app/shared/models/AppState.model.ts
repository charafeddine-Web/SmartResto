import { Product } from './Product.model';
import { Order } from './Order.model';
import { Review } from './Review.model';

export interface AppState {
  products: Product[];
  orders: Order[];
  reviews: Review[];
}
