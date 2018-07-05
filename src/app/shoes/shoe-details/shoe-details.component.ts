import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '../../product';
import { ProductdataService } from '../../services/productdata.service';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.css']
})
export class ShoeDetailsComponent implements OnInit {
  product: Product;
  errors: string[];
  private deptList: string[] = [
    'ammunition',
    'archery',
    'firearms',
    'hunting',
    'license',
    'marine',
    'nc tags',
    'sporting goods'
  ];
  private catList: string[] = [
    'accessories',
    'apparel',
    'boats',
    'footwear',
    'labor',
    'optics',
    'outboard motors',
    'parts',
    'pistols',
    'rifles',
    'skiwear',
    'trailers'
  ];
  editForm: FormGroup = this.fb.group({
    upc: ['', [Validators.required, Validators.minLength(12)]],
    dept: ['', Validators.required],
    category: ['', Validators.required],
    brand: ['', Validators.required],
    desc: ['', Validators.required],
    cost: ['0', [Validators.required, Validators.min(0)]],
    price: ['0', [Validators.required, Validators.min(0)]],
    suggestedRetail: ['0', Validators.min(0)],
    color: '',
    style: '',
    size: '',
    qty: ['0', [Validators.required, Validators.min(0)]],
    image: ''
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductdataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    console.log('shoe-details.component --> got the shoe', this.product);
    this.setFormValues();
  }

  onSubmit(prod: Product) {
    const cleanData = Object.assign({}, this.product, this.editForm.value);
    this.productService.updateProduct(cleanData).subscribe(
      updatedProd => {
        console.log(
          'shoe-details.component --> successfully updated shoe',
          updatedProd
        );
        // redirect to shoe list
        this.router.navigateByUrl('/products');
      },
      error => {
        console.log('shoe-details.component --> error updating shoe');
        this.errors = error.error;
      }
    );
  }

  onDelete(id) {
    this.productService.deleteProduct(id).subscribe(
      deletedProd => {
        console.log(
          'shoe-details.component --> succesfully deleted shoe',
          deletedProd
        );
        // redirect to product list
        this.router.navigateByUrl('/products');
      },
      error => {
        console.log('shoe-details.component --> error deleting shoe');
        this.errors = error.error;
      }
    );
  }

  reset() {
    this.editForm.patchValue(this.product);
  }
}
