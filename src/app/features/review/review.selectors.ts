import { createSelector } from '@ngrx/store';
import { Review } from '../../shared/models/Review.model';

// Sélecteur pour accéder au state reviews depuis le root state
export const selectReviewsState = (state: { reviews: Review[] }) => state.reviews || [];

export const selectAllReviews = createSelector(
  selectReviewsState,
  (reviews: Review[]) => reviews
);

export const selectReviewCount = createSelector(
  selectReviewsState,
  (reviews: Review[]) => reviews.length
);

export const selectAverageRating = createSelector(
  selectReviewsState,
  (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }
);

export const selectRecentReviews = createSelector(
  selectReviewsState,
  (reviews: Review[]) => {
    return [...reviews].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5);
  }
);

export const selectReviewsByProductId = (productId: number) => createSelector(
  selectReviewsState,
  (reviews: Review[]) => reviews.filter(review => review.productId === productId)
);

export const selectAverageRatingByProductId = (productId: number) => createSelector(
  selectReviewsState,
  (reviews: Review[]) => {
    const productReviews = reviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) return 0;
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / productReviews.length;
  }
);

export const selectReviewCountByProductId = (productId: number) => createSelector(
  selectReviewsState,
  (reviews: Review[]) => reviews.filter(r => r.productId === productId).length
);
