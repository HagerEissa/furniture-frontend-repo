import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product-service';
declare var bootstrap: any;

@Component({
  selector: 'app-add-product-form',
  imports: [FormsModule],
  templateUrl: './add-product-form.html',
  styleUrl: './add-product-form.css',
})
export class AddProductForm {
  @Output() productAdded = new EventEmitter<void>();

  product = {
    name: '',
    desc: '',
    shortDesc: '',
    price: 0,
    discount: 0,
    productImage: '',
    category: '',
    stock: 0,
    isnew: true,
  };

  selectedFile: File | null = null;

  constructor(private productService: ProductService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  addProduct(form: any) {
    const formData = new FormData();

    formData.append('name', this.product.name);
    formData.append('desc', this.product.desc);
    formData.append('shortDesc', this.product.shortDesc || '');
    formData.append('price', this.product.price.toString());
    formData.append('discount', this.product.discount.toString());
    formData.append('productImage', this.selectedFile!);
    formData.append('categoryId', this.product.category);
    formData.append('stock', this.product.stock.toString());
    formData.append('isnew', this.product.isnew.toString());

    console.log('FormData being sent:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    this.productService.addProduct(formData).subscribe({
      next: (res) => {
        console.log('Product added successfully', res);
        const modalElement = document.getElementById('addModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.resetForm(form);
        this.selectedFile = null;

        this.productAdded.emit();
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product. Check console for details.');
      },
    });
  }

  resetForm(form: any) {
    form.resetForm();
    this.selectedFile = null;
  }
}
