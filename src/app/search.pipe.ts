import { Pipe, PipeTransform, Output } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(elements: Product[], filter): Product[] {
    if (!elements || !filter) {
      console.log('no search');
      return elements;
    }
    return elements.filter(element => {
      const searchUPC = element.upc.toString().includes(filter);
      const searchBrand = element.brand
        .toLowerCase()
        .includes(filter.toLowerCase());
      const searchDesc = element.desc
        .toLowerCase()
        .includes(filter.toLowerCase());
      const searchStyle = element.style
        .toLowerCase()
        .includes(filter.toLowerCase());
      console.log(searchUPC, searchBrand, searchDesc, searchStyle);
      return searchUPC || searchBrand || searchDesc || searchStyle;
    });
  }
}
