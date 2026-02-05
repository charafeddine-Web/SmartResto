import { createReducer, on } from '@ngrx/store';
import { Review } from '../../shared/models/Review.model';
import * as ReviewActions from './review.actions';

export const initialState: Review[] = [];

// Fonction helper pour sauvegarder dans localStorage avec structure par produit
function saveToLocalStorage(reviews: Review[]): void {
  const avisParProduit: { [key: string]: { idproduit: number; avis: Review[] } } = {};
  
  reviews.forEach(review => {
    const productId = review.productId?.toString() || 'sans-produit';
    if (!avisParProduit[productId]) {
      avisParProduit[productId] = {
        idproduit: review.productId || 0,
        avis: []
      };
    }
    avisParProduit[productId].avis.push(review);
  });
  
  localStorage.setItem('avis', JSON.stringify(avisParProduit));
  console.log('💾 Structure localStorage (par produit):', avisParProduit);
}

export const reviewReducer = createReducer(
  initialState,
  on(ReviewActions.addReview, (state, { review }) => {
    console.log('🔧 Reducer: State actuel avant ajout:', state);
    console.log('🔧 Reducer: Avis à ajouter:', review);
    const newReviews = [...state, review];
    saveToLocalStorage(newReviews);
    console.log('✅ Reducer: Avis ajouté au state et sauvegardé dans localStorage');
    console.log('📦 Nouveau state reviews:', newReviews);
    return newReviews;
  }),
  on(ReviewActions.removeReview, (state, { reviewId }) => {
    const newReviews = state.filter(review => review.id !== reviewId);
    saveToLocalStorage(newReviews);
    console.log('✅ Reducer: Avis supprimé du state et localStorage mis à jour');
    return newReviews;
  }),
  on(ReviewActions.loadReviewsSuccess, (state, { reviews }) => {
    console.log('✅ Reducer: Avis chargés dans le state depuis localStorage');
    return reviews;
  }),
  on(ReviewActions.updateReview, (state, { review }) => {
    const newReviews = state.map(r =>
      r.id === review.id ? review : r
    );
    saveToLocalStorage(newReviews);
    console.log('✅ Reducer: Avis mis à jour dans le state et localStorage');
    return newReviews;
  })
);
