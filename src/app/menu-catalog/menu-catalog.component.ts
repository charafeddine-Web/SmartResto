import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, CartItem, CatalogAppState } from '../shared/models/Product.model';
import * as ProductActions from './product.actions';
import * as ProductSelectors from './product.selectors';

import { CommonModule, AsyncPipe, NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-menu-catalog',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, NgForOf],
  templateUrl: './menu-catalog.component.html',
  styleUrls: ['./menu-catalog.component.css']
})
export class MenuCatalogComponent implements OnInit {
  products$: Observable<Product[]>;
  cart$: Observable<CartItem[]>;
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string>;
  cartTotal$: Observable<number>;
  cartItemCount$: Observable<number>;
  
  showCart = false;
  searchTerm = '';

  constructor(private store: Store<{ productState: CatalogAppState }>) {
    this.products$ = this.store.select(ProductSelectors.selectFilteredProducts);
    this.cart$ = this.store.select(ProductSelectors.selectCart);
    this.categories$ = this.store.select(ProductSelectors.selectCategories);
    this.selectedCategory$ = this.store.select(ProductSelectors.selectSelectedCategory);
    this.cartTotal$ = this.store.select(ProductSelectors.selectCartTotal);
    this.cartItemCount$ = this.store.select(ProductSelectors.selectCartItemCount);
  }

  async ngOnInit(): Promise<void> {
    // Utiliser la clé 'api-menu' dans localStorage pour les produits
    let products: Product[] = [];
    const storedProducts = localStorage.getItem('api-menu');
    if (storedProducts) {
      const parsed = JSON.parse(storedProducts);
      products = Array.isArray(parsed) ? parsed : parsed.products;
    } else {
      try {
        const response = await fetch('assets/api-menu.json');
        const data = await response.json();
        products = Array.isArray(data) ? data : data.products;
        localStorage.setItem('api-menu', JSON.stringify(products));
      } catch (e) {
        console.error('Erreur de chargement des produits', e);
      }
    }
    this.store.dispatch(ProductActions.loadProductsSuccess({ products }));
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart: CartItem[] = JSON.parse(savedCart);
      this.store.dispatch(ProductActions.loadCartFromStorage({ cart }));
    }
  }

  filterByCategory(category: string): void {
    this.store.dispatch(ProductActions.setCategory({ category }));
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.store.dispatch(ProductActions.setSearchTerm({ searchTerm }));
  }

  addToCart(product: Product): void {
    this.store.dispatch(ProductActions.addToCart({ product }));
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(ProductActions.removeFromCart({ productId }));
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  checkout(total: number): void {
    alert(`Total à payer: $${total.toFixed(2)}`);
    this.store.dispatch(ProductActions.clearCart());
    this.showCart = false;
  }
}
