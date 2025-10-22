import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product-form.html',
  styleUrl: './edit-product-form.css',
})
export class EditProductForm {
  @Input() product: any;
  @Output() productUpdated = new EventEmitter<void>();
  selectedFile: File | null = null;

  constructor(private productService: ProductService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  updateProduct() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('desc', this.product.desc);
    formData.append('shortDesc', this.product.shortDesc);
    formData.append('price', this.product.price.toString());
    formData.append('discount', this.product.discount.toString());
    formData.append('category', this.product.categoryId);
    formData.append('stock', this.product.stock.toString());
    formData.append('isnew', this.product.isnew.toString());

    if (this.selectedFile) {
      formData.append('productImage', this.selectedFile);
    }

    this.productService.updateProduct(this.product._id, formData).subscribe({
      next: (res) => {
        console.log('Product updated successfully:', res);

        const modalElement = document.getElementById('editModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.productUpdated.emit();
      },
      error: (err) => {
        console.error('Error updating product:', err);
      },
    });
  }
}
