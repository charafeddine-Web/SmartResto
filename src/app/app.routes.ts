import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'review', loadChildren: () => import('./features/review/review.module').then(m => m.ReviewModule) }
];
