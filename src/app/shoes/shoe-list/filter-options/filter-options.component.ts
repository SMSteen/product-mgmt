import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from '../../../product';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css']
})
export class FilterOptionsComponent implements OnInit {
  @Input() prodList: Product[];

  departments: string[] = [];
  categories: string[] = [];
  brands: string[] = [];
  items: string[] = [];
  styles: string[] = [];
  sizes: any[] = [];
  showFilterOptions = false;

  constructor() {}

  ngOnInit() {
    console.log(this.prodList);

    this.prodList.forEach(element => {
      this.departments.push(element.dept);
      this.categories.push(element.category);
      this.brands.push(element.brand);
      this.items.push(element.desc);
      this.styles.push(element.style);
      this.sizes.push(element.size);
    });

    if (
      this.departments.length > 1 ||
      this.categories.length > 1 ||
      this.brands.length > 1 ||
      this.items.length > 1 ||
      this.styles.length > 1 ||
      this.sizes.length > 1
    ) {
      this.showFilterOptions = true;
    }

    this.departments = this.departments.filter(this.onlyUnique).sort();
    this.categories = this.categories.filter(this.onlyUnique).sort();
    this.brands = this.brands.filter(this.onlyUnique).sort();
    this.items = this.items.filter(this.onlyUnique).sort();
    this.styles = this.styles.filter(this.onlyUnique).sort();
    this.sizes = this.sizes.filter(this.onlyUnique).sort();

    console.log('depts', this.departments);
    console.log('cats', this.categories);
    console.log('brands', this.brands);
    console.log('items', this.items);
    console.log('styles', this.styles);
    console.log('sizes', this.sizes);
  }

  applyFilter(value) {
    console.log(value);
  }

  // helper function to remove duplicate values in filter arrays
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
