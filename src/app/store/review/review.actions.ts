import { createAction, props } from '@ngrx/store';
import { Review } from '../../shared/models/Review.model';

export const addReview = createAction(
  '[Review] Add Review',
  props<{ review: Review }>()
);

export const removeReview = createAction(
  '[Review] Remove Review',
  props<{ reviewId: number }>()
);

export const loadReviews = createAction(
  '[Review] Load Reviews'
);

export const loadReviewsSuccess = createAction(
  '[Review] Load Reviews Success',
  props<{ reviews: Review[] }>()
);

export const updateReview = createAction(
  '[Review] Update Review',
  props<{ review: Review }>()
);
