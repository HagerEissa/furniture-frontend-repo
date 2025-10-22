import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log('Selected file:', this.selectedFile);
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Use FileReader to preview image
      const reader = new FileReader();
      reader.onload = () => {
        // Update preview before submitting
        this.product.imgURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
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

// export class EditProductModalComponent {
//   @Input() product: any; // product passed from parent
//   selectedFile: File | null = null;

//   constructor(private _productService: ProductService) {}

//   // ✅ Handle file selection + preview
//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;

//       // Update preview immediately
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.product.imgURL = reader.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   // ✅ Update the product
//   updateProduct() {
//     if (!this.product) return;

//     const formData = new FormData();
//     formData.append('name', this.product.name);
//     formData.append('desc', this.product.desc);
//     formData.append('shortDesc', this.product.shortDesc);
//     formData.append('price', this.product.price);
//     formData.append('discount', this.product.discount || 0);
//     formData.append('categoryId', this.product.categoryId);
//     formData.append('stock', this.product.stock);
//     formData.append('isnew', this.product.isnew);

//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile);
//     }

//     this._productService.updateProduct(this.product.id, formData).subscribe({
//       next: () => {
//         alert('✅ Product updated successfully!');
//         // You can also emit an event here to refresh the product list or close modal
//       },
//       error: (err) => {
//         console.error('❌ Error updating product:', err);
//       },
//     });
//   }
// }
