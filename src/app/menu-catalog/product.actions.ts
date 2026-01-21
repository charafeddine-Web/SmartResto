// Stock management actions
export const decreaseProductStock = createAction(
  '[Stock] Decrease Product Stock',
  props<{ productId: number; quantity: number }>()
);

export const increaseProductStock = createAction(
  '[Stock] Increase Product Stock',
  props<{ productId: number; quantity: number }>()
);
import { createAction, props } from '@ngrx/store';
import { Product, CartItem } from '../shared/models/Product.model';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const setCategory = createAction(
  '[Filter] Set Category',
  props<{ category: string }>()
);

export const setSearchTerm = createAction(
  '[Filter] Set Search Term',
  props<{ searchTerm: string }>()
);

export const loadCartFromStorage = createAction(
  '[Cart] Load From Storage',
  props<{ cart: CartItem[] }>()
);
// File cleared as requested
