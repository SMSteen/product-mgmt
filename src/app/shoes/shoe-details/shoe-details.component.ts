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
import { ProductdataService } from '../../productdata.service';

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
    // get the id of the selected product passed through params
    this.route.paramMap
      .pipe(
        switchMap(params => this.productService.getProduct(params.get('id')))
      )
      .subscribe(
        product => {
          console.log('shoe-details.component --> got the shoe', product);
          this.product = product;
          this.editForm.patchValue(this.product);
        },
        error => {
          console.log('shoe-details.component --> error getting shoe');
          this.errors = error.error;
        }
      );
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

  // setFormValues() {
  //   this.editForm.setValue({
  //     upc: this.product.upc,
  //     dept: this.product.dept,
  //     category: this.product.category,
  //     brand: this.product.brand,
  //     desc: this.product.desc,
  //     cost: this.product.cost,
  //     price: this.product.price,
  //     suggestedRetail: this.product.suggestedRetail,
  //     color: this.product.color,
  //     style: this.product.style,
  //     size: this.product.size,
  //     qty: this.product.qty,
  //     image: this.product.image
  //   });
  // }

  reset() {
    this.editForm.patchValue(this.product);
  }
}
