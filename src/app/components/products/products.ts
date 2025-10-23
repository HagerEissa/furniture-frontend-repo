import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductService } from '../../core/services/product-service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: any;
  @Input() limit: number | null = null;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (error) => console.log('Error ', error),
    });
  }
}
