
import { Routes } from '@angular/router';
import { MenuCatalogComponent } from './menu-catalog/menu-catalog.component';
import { ReviewComponent } from './features/review/review.component';

export const routes: Routes = [
	{ path: '', component: MenuCatalogComponent },
	{ path: 'reviews', component: ReviewComponent },
];
