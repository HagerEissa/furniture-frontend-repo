import { Component, Input, OnInit } from '@angular/core';
import { EditCategoryForm } from '../../Forms/edit-category-form/edit-category-form';
import { CategoryService } from '../../core/services/category-service';
declare var bootstrap: any;

@Component({
  selector: 'app-categories-tab',
  standalone: true,
  imports: [EditCategoryForm],
  templateUrl: './categories-tab.html',
  styleUrl: './categories-tab.css',
})
export class CategoriesTab implements OnInit {
  categories: any[] = [];
  selectedCategory: any = null;

  constructor(private categoriesService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    // this.categoriesService.getAllCategories().subscribe((res: any) => {
    //   this.categories = res;
    // });
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  openEditModal(category: any) {
    this.selectedCategory = { ...category };
    const modal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
    modal.show();
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Category deleted');
        this.loadCategories();
      },
      error: (err) => console.error('Error deleting category:', err),
    });
  }
}
// export class CategoriesTab implements OnInit {
//   categories: any[] = [];
//   selectedCategory: any = null;

//   constructor(private categoriesService: CategoryService) {}

//   ngOnInit() {
//     this.loadCategories();
//   }

//   reloadCategories() {
//     this.loadCategories();
//   }

//   loadCategories() {
//     this.categoriesService.getAllCategories().subscribe({
//       next: (res: any) => {
//         this.categories = res;
//       },
//       error: (err) => console.error('Error fetching categories:', err),
//     });
//   }

//   openEditModal(category: any) {
//     this.selectedCategory = { ...category };
//     const modal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
//     modal.show();
//   }

//   deleteCategory(id: string) {
//     this.categoriesService.deleteCategory(id).subscribe({
//       next: () => {
//         console.log('Category deleted');
//         this.loadCategories();
//       },
//       error: (err) => console.error('Error deleting category:', err),
//     });
//   }
// }

// export class CategoriesTab {
//   @Input() categories: any[] = [];
//   selectedCategory: any = null;

//   openEditModal(category: any) {
//     this.selectedCategory = { ...category };
//     const modal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
//     modal.show();
//   }
// }

// export class CategoriesTab {
//   // Parent (Dashboard) will pass categories down
//   @Input() categories: any[] = [];

//   // Notify parent to reload categories after changes (add/delete/edit)
//   @Output() categoryUpdated = new EventEmitter<void>();

//   selectedCategory: any = null;

//   constructor(private categoriesService: CategoryService) {}

//   /** Open edit modal and populate the selectedCategory object */
//   openEditModal(category: any) {
//     // clone so edits in the modal don't mutate list until saved
//     this.selectedCategory = { ...category };
//     const modalEl = document.getElementById('editCategoryModal');
//     if (!modalEl) {
//       console.warn('Edit modal element not found: #editCategoryModal');
//       return;
//     }
//     const modal = new bootstrap.Modal(modalEl);
//     modal.show();
//   }

//   /** Delete a category, then tell parent to reload */
//   deleteCategory(id: string) {
//     if (!confirm('Are you sure you want to delete this category?')) return;

//     this.categoriesService.deleteCategory(id).subscribe({
//       next: () => {
//         console.log('Category deleted:', id);
//         // emit so parent (dashboard) can reload categories from backend
//         this.categoryUpdated.emit();
//       },
//       error: (err) => {
//         console.error('Error deleting category:', err);
//         alert('Failed to delete category. Check console for details.');
//       },
//     });
//   }
// }
