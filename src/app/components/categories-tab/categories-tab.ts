import { Component, OnInit } from '@angular/core';
import { EditCategoryForm } from '../../Forms/edit-category-form/edit-category-form';
import { CategoryService } from '../../core/services/category-service';
import { ProductStateService } from '../../core/services/product-state.service';
import { Router } from '@angular/router';
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

  constructor(
    private categoriesService: CategoryService,
    private productState: ProductStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  reloadCategories() {
    this.loadCategories();
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

  selectCategory(categoryId: string) {
    this.productState.setFilter(categoryId); 
    this.router.navigate(['/shop']);
  }
}
