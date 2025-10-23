// import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
// import { ProductService } from '../../core/services/product-service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// declare var bootstrap: any;

// @Component({
//   selector: 'app-edit-product-form',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './edit-product-form.html',
//   styleUrl: './edit-product-form.css',
// })
// export class EditProductForm {
//   @Input() product: any;
//   @Output() productUpdated = new EventEmitter<void>();
//   selectedFile: File | null = null;
//   constructor(private productService: ProductService) {}

//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;

//       const reader = new FileReader();
//       reader.onload = () => {
//         this.product.imgURL = reader.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   updateProduct(form: any) {
//     const formData = new FormData();
//     formData.append('name', this.product.name);
//     formData.append('desc', this.product.desc);
//     formData.append('shortDesc', this.product.shortDesc);
//     formData.append('price', this.product.price.toString());
//     formData.append('discount', this.product.discount.toString());
//     formData.append('categoryId', this.product.categoryId);
//     formData.append('stock', this.product.stock.toString());
//     formData.append('isnew', this.product.isnew.toString());

//     if (this.selectedFile) {
//       formData.append('productImage', this.selectedFile);
//     }

//     console.log('Sending FormData:');
//     for (let pair of formData.entries()) {
//       console.log(`${pair[0]}:`, pair[1]);
//     }

//     this.productService.updateProduct(this.product._id, formData).subscribe({
//       next: (res) => {
//         console.log('✅ Product updated successfully:', res);

//         // Close modal
//         const modalElement = document.getElementById('editModal');
//         const modal = bootstrap.Modal.getInstance(modalElement);
//         modal.hide();

//         // Reset the form
//         this.resetForm(form);
//         this.selectedFile = null;

//         // Emit to refresh list
//         this.productUpdated.emit();
//       },
//       error: (err) => {
//         console.error('❌ Error updating product:', err);
//         alert('Error updating product. Check console for details.');
//       },
//     });
//   }

//   resetForm(form: any) {
//     form.resetForm();
//     this.selectedFile = null;
//   }
// }

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

// updateProduct() {
//   const formData = new FormData();
//   formData.append('name', this.product.name);
//   formData.append('desc', this.product.desc);
//   formData.append('shortDesc', this.product.shortDesc);
//   formData.append('price', this.product.price.toString());
//   formData.append('discount', this.product.discount.toString());
//   formData.append('categoryId', this.product.categoryId);
//   formData.append('stock', this.product.stock.toString());
//   formData.append('isnew', this.product.isnew.toString());

//   if (this.selectedFile) {
//     formData.append('productImage', this.selectedFile);
//   }

//   this.productService.updateProduct(this.product._id, formData).subscribe({
//     next: (res) => {
//       console.log('Product updated successfully:', res);

//       const modalElement = document.getElementById('editModal');
//       const modal = bootstrap.Modal.getInstance(modalElement);
//       modal.hide();
//       this.productUpdated.emit();
//     },
//     error: (err) => {
//       console.error('Error updating product:', err);
//     },
//   });
// }

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

  /** Handle Image Change */
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

  /** Submit Updated Product */
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

    console.log('📤 Sending FormData:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    this.productService.updateProduct(this.product._id, formData).subscribe({
      next: (res) => {
        console.log('✅ Product updated successfully:', res);

        // Close modal
        const modalElement = document.getElementById('editModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Reset form
        this.resetForm(form);
        this.selectedFile = null;

        // Notify parent to refresh the product list
        this.productUpdated.emit();
      },
      error: (err) => {
        console.error('❌ Error updating product:', err);
        alert('Error updating product. Check console for details.');
      },
    });
  }

  /** Cancel or Close Modal */
  onCancel(form: any) {
    this.resetForm(form);
  }

  /** Reset All Fields and Errors */
  resetForm(form: any) {
    form.resetForm();
    this.selectedFile = null;
  }
}
