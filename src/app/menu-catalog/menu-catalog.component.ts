import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, CartItem, CatalogAppState } from '../shared/models/Product.model';
import { Review } from '../shared/models/Review.model';
import * as ProductActions from '../store/product/product.actions';
import * as ProductSelectors from '../store/product/product.selectors';
import * as ReviewActions from '../store/review/review.actions';
import * as ReviewSelectors from '../store/review/review.selectors';

import { CommonModule, AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { ProductReviewModalComponent } from '../features/review/product-review-modal.component';

@Component({
  selector: 'app-menu-catalog',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, NgForOf, ProductReviewModalComponent],
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
  selectedProduct: Product | null = null;
  cartList: CartItem[] = [];

  constructor(private store: Store<{ productState: CatalogAppState; reviews: Review[] }>) {
    this.products$ = this.store.select(ProductSelectors.selectFilteredProducts);
    this.cart$ = this.store.select(ProductSelectors.selectCart);
    this.categories$ = this.store.select(ProductSelectors.selectCategories);
    this.selectedCategory$ = this.store.select(ProductSelectors.selectSelectedCategory);
    this.cartTotal$ = this.store.select(ProductSelectors.selectCartTotal);
    this.cartItemCount$ = this.store.select(ProductSelectors.selectCartItemCount);
    
    this.cart$.subscribe(cart => {
      this.cartList = cart;
    });
    
    // Charger les reviews depuis localStorage au démarrage
    this.loadReviewsFromStorage();
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

  private loadReviewsFromStorage(): void {
    const savedAvis = localStorage.getItem('avis');
    if (savedAvis) {
      try {
        const avisParProduit = JSON.parse(savedAvis);
        console.log('🚀 Application: Chargement des avis au démarrage (structure par produit)', avisParProduit);
        
        // Convertir la structure { "1": { idproduit, avis: [...] } } en tableau plat
        const allReviews: any[] = [];
        Object.values(avisParProduit).forEach((productData: any) => {
          if (productData.avis && Array.isArray(productData.avis)) {
            allReviews.push(...productData.avis);
          }
        });
        
        console.log('📝 Total avis chargés:', allReviews.length);
        this.store.dispatch(ReviewActions.loadReviewsSuccess({ reviews: allReviews }));
      } catch (e) {
        console.error('Erreur lors du chargement des avis', e);
      }
    } else {
      console.log('🚀 Application: Aucun avis trouvé dans localStorage au démarrage');
      // Initialiser avec un tableau vide
      this.store.dispatch(ReviewActions.loadReviewsSuccess({ reviews: [] }));
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
    this.store.dispatch(ProductActions.decreaseProductStock({ productId: product.id, quantity: 1 }));
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(ProductActions.removeFromCart({ productId }));
    this.store.dispatch(ProductActions.increaseProductStock({ productId, quantity: 1 }));
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  checkout(total: number): void {
    alert(`Total à payer: $${total.toFixed(2)}`);
    this.store.dispatch(ProductActions.clearCart());
    this.showCart = false;
  }

  openReviewModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeReviewModal(): void {
    this.selectedProduct = null;
  }

  // Obtenir le nombre d'avis pour un produit
  getReviewCount(productId: number): Observable<number> {
    return this.store.select(ReviewSelectors.selectReviewCountByProductId(productId));
  }
}
