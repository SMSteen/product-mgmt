import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductdataService } from '../services/productdata.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productService: ProductdataService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    return this.productService.getProduct(route.paramMap.get('id'));
  }
}
