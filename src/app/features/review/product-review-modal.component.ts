import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Review } from '../../shared/models/Review.model';
import { Product } from '../../shared/models/Product.model';
import * as ReviewActions from '../../store/review/review.actions';
import * as ReviewSelectors from '../../store/review/review.selectors';

@Component({
  selector: 'app-product-review-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-review-modal.component.html',
  styleUrls: ['./product-review-modal.component.css']
})
export class ProductReviewModalComponent implements OnInit {
  @Input() product!: Product;
  @Output() closeModal = new EventEmitter<void>();

  reviewForm!: FormGroup;
  reviews$!: Observable<Review[]>;
  averageRating$!: Observable<number>;
  reviewCount$!: Observable<number>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ productState: any; reviews: Review[] }>
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    if (this.product) {
      this.reviews$ = this.store.select(ReviewSelectors.selectReviewsByProductId(this.product.id));
      this.averageRating$ = this.store.select(ReviewSelectors.selectAverageRatingByProductId(this.product.id));
      this.reviewCount$ = this.store.select(ReviewSelectors.selectReviewCountByProductId(this.product.id));
      
      // Log pour confirmer que les reviews sont déjà dans le store
      this.reviews$.subscribe(reviews => {
        console.log(`📝 Avis pour "${this.product.name}" (${reviews.length}):`, reviews);
      });
    }
  }

  private initializeForm(): void {
    this.reviewForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitReview(): void {
    if (this.reviewForm.valid && this.product) {
      const newReview: Review = {
        id: Date.now(),
        username: this.reviewForm.value.username,
        rating: Number(this.reviewForm.value.rating),
        comment: this.reviewForm.value.comment,
        date: new Date(),
        productId: this.product.id,
        productName: this.product.name
      };
      console.log('✅ Nouvel avis ajouté:', newReview);
      console.log('📤 Dispatching action addReview...');
      this.store.dispatch(ReviewActions.addReview({ review: newReview }));
      console.log('💾 Action dispatchée au store');
      
      // Recharger les avis pour ce produit après l'ajout
      setTimeout(() => {
        if (this.product) {
          this.reviews$ = this.store.select(ReviewSelectors.selectReviewsByProductId(this.product.id));
          this.averageRating$ = this.store.select(ReviewSelectors.selectAverageRatingByProductId(this.product.id));
          this.reviewCount$ = this.store.select(ReviewSelectors.selectReviewCountByProductId(this.product.id));
          
          this.reviews$.subscribe(reviews => {
            console.log('🔍 Avis mis à jour pour ce produit:', reviews);
            console.log('🔍 Nombre d\'avis:', reviews.length);
          });
          
          // Vérifier aussi le state global
          this.store.select(state => state.reviews).subscribe(allReviews => {
            console.log('🔍 ALL REVIEWS dans le state global:', allReviews);
            console.log('🔍 Total d\'avis globaux:', allReviews?.length || 0);
          });
        }
      }, 100);
      
      this.reviewForm.reset();
    }
  }

  deleteReview(reviewId: number): void {
    // Fonction désactivée - les avis ne peuvent pas être supprimés
    console.log('🚫 Suppression d\'avis désactivée');
  }

  onClose(): void {
    this.closeModal.emit();
  }

  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  trackByReviewId(index: number, review: Review): number {
    return review.id;
  }
}
