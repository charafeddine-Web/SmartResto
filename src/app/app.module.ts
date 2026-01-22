import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { MenuCatalogComponent } from './menu-catalog/menu-catalog.component';
import { productReducer } from './menu-catalog/product.reducer';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // MenuCatalogComponent est standalone, ne pas le déclarer ici
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MenuCatalogComponent,
    StoreModule.forRoot({ productState: productReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [],
  bootstrap: [MenuCatalogComponent]
})
export class AppModule { }
