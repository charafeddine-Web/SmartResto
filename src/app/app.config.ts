import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './store/product/product.reducer';
import { reviewReducer } from './store/review/review.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ 
      productState: productReducer,
      reviews: reviewReducer 
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
