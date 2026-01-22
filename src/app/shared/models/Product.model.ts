
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

// Helper functions for stock management
export function decreaseStock(product: Product, quantity: number): Product {
  return { ...product, stock: Math.max(0, product.stock - quantity) };
}

export function increaseStock(product: Product, quantity: number): Product {
  return { ...product, stock: product.stock + quantity };
}

export interface CartItem extends Product {
  quantity: number;
}

// AppState spécifique au menu/catalogue
export interface CatalogAppState {
  products: Product[];
  cart: CartItem[];
  selectedCategory: string;
  searchTerm: string;
}