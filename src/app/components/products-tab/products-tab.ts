import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditProductForm } from '../../Forms/edit-product-form/edit-product-form';
import { ProductService } from '../../core/services/product-service';

declare var bootstrap: any;

@Component({
  selector: 'app-products-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, EditProductForm],
  templateUrl: './products-tab.html',
  styleUrl: './products-tab.css',
})
export class ProductsTab implements OnInit {
  products: any[] = [];
  selectedProduct: any = {};

  constructor(private productService: ProductService) {}

  openEditModal(product: any) {
    this.selectedProduct = {
      ...product,
      categoryId: product.categoryId?.name || product.categoryId,
    };
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = this.products.filter((product) => product._id !== id);
      },
    });
  }

  reloadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => (this.products = data),
      error: (err) => console.error(err),
    });
  }
}
