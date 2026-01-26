import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./review-list/review-list.component').then(m => m.ReviewListComponent) },
      { path: 'add', loadComponent: () => import('./review-form/review-form.component').then(m => m.ReviewFormComponent) }
    ])
  ]
})
export class ReviewModule { }
