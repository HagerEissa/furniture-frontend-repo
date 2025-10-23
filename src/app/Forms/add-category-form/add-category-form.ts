import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category-service';
declare var bootstrap: any;

@Component({
  selector: 'app-add-category-form',
  imports: [FormsModule],
  templateUrl: './add-category-form.html',
  styleUrl: './add-category-form.css',
})
export class AddCategoryForm {
  category = {
    name: '',
  };

  selectedFile: File | null = null;

  constructor(private categoryService: CategoryService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  addCategory() {
    if (!this.category.name || !this.selectedFile) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.category.name);
    formData.append('imgURL', this.selectedFile);

    this.categoryService.addCategory(formData).subscribe({
      next: (res) => {
        console.log('✅ Category added successfully:', res);

        // Close modal
        const modalElement = document.getElementById('addCategoryModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Reset form
        this.category.name = '';
        this.selectedFile = null;
      },
      error: (err:any) => {
        console.error('❌ Error adding category:', err);
      },
    });
  }
}
