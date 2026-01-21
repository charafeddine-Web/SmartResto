import { createReducer, on } from '@ngrx/store';
import { CatalogAppState } from '../shared/models/Product.model';
import * as ProductActions from './product.actions';

export const initialState: CatalogAppState = {
  products: [],
  cart: [],
  selectedCategory: 'All',
  searchTerm: ''
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  })),
  on(ProductActions.addToCart, (state, { product }) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    let newCart;
    if (existingItem) {
      newCart = state.cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...state.cart, { ...product, quantity: 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { ...state, cart: newCart };
  }),
  on(ProductActions.removeFromCart, (state, { productId }) => {
    let newCart;
    const item = state.cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
      newCart = state.cart.map(i =>
        i.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    } else {
      newCart = state.cart.filter(i => i.id !== productId);
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { ...state, cart: newCart };
  }),
  on(ProductActions.clearCart, (state) => {
    localStorage.removeItem('cart');
    return { ...state, cart: [] };
  }),
  on(ProductActions.setCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category
  })),
  on(ProductActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm
  })),

  on(ProductActions.loadCartFromStorage, (state, { cart }) => ({
    ...state,
    cart
  })),

  // Stock management
  on(ProductActions.decreaseProductStock, (state, { productId, quantity }) => {
    const newProducts = state.products.map(product =>
      product.id === productId
        ? { ...product, stock: Math.max(0, product.stock - quantity) }
        : product
    );
    localStorage.setItem('api-menu', JSON.stringify(newProducts));
    return { ...state, products: newProducts };
  }),
  on(ProductActions.increaseProductStock, (state, { productId, quantity }) => {
    const newProducts = state.products.map(product =>
      product.id === productId
        ? { ...product, stock: product.stock + quantity }
        : product
    );
    localStorage.setItem('api-menu', JSON.stringify(newProducts));
    return { ...state, products: newProducts };
  })
);
// File cleared as requested
