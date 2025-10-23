import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product-service';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private allProducts: any[] = [];
  private _displayedProducts = new BehaviorSubject<any[]>([]);
  displayedProducts$ = this._displayedProducts.asObservable();

  private searchText = '';
  private sortOption: string = 'default';
  private filterOption: string = 'all'; 

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data || [];
        this.applyFilters();
      },
      error: (err) => console.error(err),
    });
  }

  setSearch(text: string) {
    this.searchText = text;
    this.applyFilters();
  }

  setSort(option: string) {
    this.sortOption = option;
    this.applyFilters();
  }

  setFilter(option: string) {
    this.filterOption = option;
    this.applyFilters();
  }

  private applyFilters() {
    let result = [...this.allProducts];

    if (this.searchText) {
      const text = this.searchText.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(text)) ||
          (p.shortDesc && p.shortDesc.toLowerCase().includes(text))
      );
    }

if (this.filterOption && this.filterOption !== 'all') {
  const filter = this.filterOption;
  result = result.filter((p) => {
    if (!p.categoryId) return false;
    if (typeof p.categoryId === 'object' && '_id' in p.categoryId) {
      return p.categoryId._id === filter;
    }
    return p.categoryId.toString() === filter;
  });
}


    if (this.sortOption === 'price-asc') {
      result = result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (this.sortOption === 'price-desc') {
      result = result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    this._displayedProducts.next(result);
  }
}
