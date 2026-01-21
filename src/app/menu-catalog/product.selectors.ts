import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogAppState, Product, CartItem } from '../shared/models/Product.model';

export const selectProductState = createFeatureSelector<CatalogAppState>('productState');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: CatalogAppState): Product[] => state.products
);

export const selectCart = createSelector(
  selectProductState,
  (state: CatalogAppState): CartItem[] => state.cart
);

export const selectSelectedCategory = createSelector(
  selectProductState,
  (state: CatalogAppState): string => state.selectedCategory
);

export const selectSearchTerm = createSelector(
  selectProductState,
  (state: CatalogAppState): string => state.searchTerm
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectSelectedCategory,
  selectSearchTerm,
  (products: Product[], category: string, searchTerm: string): Product[] => {
    return products.filter((product: Product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
);

export const selectCategories = createSelector(
  selectAllProducts,
  (products: Product[]): string[] => ['All', ...Array.from(new Set(products.map((p: Product) => p.category)))]
);

export const selectCartTotal = createSelector(
  selectCart,
  (cart: CartItem[]): number => cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
);

export const selectCartItemCount = createSelector(
  selectCart,
  (cart: CartItem[]): number => cart.reduce((count: number, item: CartItem) => count + item.quantity, 0)
);
// File cleared as requested
