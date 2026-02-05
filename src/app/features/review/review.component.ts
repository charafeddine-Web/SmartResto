import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Review } from '../../shared/models/Review.model';
import * as ReviewActions from './review.actions';
import * as ReviewSelectors from './review.selectors';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
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
    this.reviews$ = this.store.select(ReviewSelectors.selectAllReviews);
    this.averageRating$ = this.store.select(ReviewSelectors.selectAverageRating);
    this.reviewCount$ = this.store.select(ReviewSelectors.selectReviewCount);
    this.loadReviewsFromStorage();
  }

  private initializeForm(): void {
    this.reviewForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = {
        id: Date.now(),
        username: this.reviewForm.value.username,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        date: new Date()
      };
      this.store.dispatch(ReviewActions.addReview({ review: newReview }));
      this.reviewForm.reset();
    }
  }

  deleteReview(reviewId: number): void {
    this.store.dispatch(ReviewActions.removeReview({ reviewId }));
  }

  private loadReviewsFromStorage(): void {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      const reviews = JSON.parse(savedReviews);
      this.store.dispatch(ReviewActions.loadReviewsSuccess({ reviews }));
    }
  }

  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  trackByReviewId(index: number, review: Review): number {
    return review.id;
  }
}
