export class Product {
  _id: number;
  upc: number; // ALL ITEMS - upc?
  dept: string; // ALL ITEMS
  category: string; // ALL ITEMS
  brand: string; // ALL ITEMS - vendor/manufacturer?
  desc: string; // ALL ITEMS - description?
  cost: number; // ALL ITEMS
  price: number; // ALL ITEMS
  suggestedRetail: number; // not all items; default price if null?
  style: string; // not all items
  partNo: string; // not all items
  serialNo: string; // not all items
  color: string; // not all items
  size: string; // not all items
  qty: number; // ALL ITEMS
  image: string; // file upload; ALL ITEMS, not required

  constructor() {
  }
}

// things to add
// serialnum: number;  not all items
// archived??
// seasonal??

let counter = 1;
export class Shoe {
  _id: number;
  brand: string;
  desc: string;
  constructor() {
    this._id = counter++;
  }
}
