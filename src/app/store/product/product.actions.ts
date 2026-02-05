import { createAction, props } from '@ngrx/store';
import { Product, CartItem } from '../../shared/models/Product.model';

// Product Management
export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

// Cart Management
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const loadCartFromStorage = createAction(
  '[Cart] Load From Storage',
  props<{ cart: CartItem[] }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

// Category Filter
export const setCategory = createAction(
  '[Category] Set Category',
  props<{ category: string }>()
);

// Search
export const setSearchTerm = createAction(
  '[Search] Set Search Term',
  props<{ searchTerm: string }>()
);

// Stock Management
export const decreaseProductStock = createAction(
  '[Stock] Decrease Product Stock',
  props<{ productId: number; quantity: number }>()
);

export const increaseProductStock = createAction(
  '[Stock] Increase Product Stock',
  props<{ productId: number; quantity: number }>()
);
