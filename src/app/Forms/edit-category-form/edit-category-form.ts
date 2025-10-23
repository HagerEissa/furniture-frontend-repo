import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category-service';
declare var bootstrap: any;

@Component({
  selector: 'app-edit-category-form',
  imports: [FormsModule],
  templateUrl: './edit-category-form.html',
  styleUrl: './edit-category-form.css',
})
export class EditCategoryForm {
  @Input() category: any = null;
  @Output() categoryUpdated = new EventEmitter<void>();
  selectedCategory: File | null = null;

  constructor(private categoriesService: CategoryService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && changes['category'].currentValue) {
      this.category = { ...changes['category'].currentValue };
    }
  }

  // onFileSelected(event: any) {
  //   this.selectedCategory = event.target.files[0];
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedCategory = file;

      // Use FileReader to preview image
      const reader = new FileReader();
      reader.onload = () => {
        // Update preview before submitting
        this.category.imgURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateCategory() {
    if (!this.category) return;

    const formData = new FormData();
    formData.append('name', this.category.name);
    if (this.selectedCategory) {
      formData.append('imgURL', this.selectedCategory);
    }

    this.categoriesService.updateCategory(this.category._id, formData).subscribe({
      next: () => {
        console.log('✅ Category updated successfully');
        const modalElement = document.getElementById('editCategoryModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.categoryUpdated.emit(); // notify parent to refresh
      },
      error: (err) => console.error('❌ Error updating category:', err),
    });
  }
}
