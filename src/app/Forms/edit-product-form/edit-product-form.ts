import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category-service';

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
  categories: any = [];
  selectedFile: File | null = null;

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Fetched categories:', data);

      if (this.product && this.product.categoryId && this.product.categoryId._id) {
          this.product.categoryId = this.product.categoryId._id;
        }
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.product.imgURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProduct(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('desc', this.product.desc);
    formData.append('shortDesc', this.product.shortDesc);
    formData.append('price', this.product.price.toString());
    formData.append('discount', this.product.discount?.toString() || '0');
    formData.append('categoryId', this.product.categoryId);
    formData.append('stock', this.product.stock.toString());
    formData.append('isnew', this.product.isnew.toString());

    if (this.selectedFile) {
      formData.append('productImage', this.selectedFile);
    }

    console.log('Sending FormData:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    this.productService.updateProduct(this.product._id, formData).subscribe({
      next: (res) => {
        console.log('Product updated successfully:', res);

        const modalElement = document.getElementById('editModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.resetForm(form);
        this.selectedFile = null;

        this.productUpdated.emit();
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Error updating product. Check console for details.');
      },
    });
  }

  onCancel(form: any) {
    this.resetForm(form);
  }

  resetForm(form: any) {
    form.resetForm();
    this.selectedFile = null;
  }
}
