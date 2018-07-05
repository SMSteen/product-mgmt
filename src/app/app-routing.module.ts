import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShoeListComponent } from './shoes/shoe-list/shoe-list.component';
import { ShoeNewComponent } from './shoes/shoe-new/shoe-new.component';
import { ShoeDetailsComponent } from './shoes/shoe-details/shoe-details.component';
import { ProductResolver } from './resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ShoeListComponent
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: ShoeNewComponent
      },
      {
        path: 'edit/:id',
        pathMatch: 'full',
        component: ShoeDetailsComponent,
        resolve: {
          product: ProductResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
