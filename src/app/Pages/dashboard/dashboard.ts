import { Component, ViewChild } from '@angular/core';
import { ProductsTab } from '../../components/products-tab/products-tab';
import { UsersTab } from '../../components/users-tab/users-tab';
import { OrdersTab } from '../../components/orders-tab/orders-tab';
import { AddProductForm } from '../../Forms/add-product-form/add-product-form';
import { HeroDashboard } from '../../components/hero-dashboard/hero-dashboard';
import { CategoriesTab } from '../../components/categories-tab/categories-tab';
import { AddCategoryForm } from '../../Forms/add-category-form/add-category-form';
declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ProductsTab,
    UsersTab,
    OrdersTab,
    HeroDashboard,
    CategoriesTab,
    AddCategoryForm,
    AddProductForm,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  newProduct = { name: '', price: 0, description: '', stock: 0, category: '' };
  newCategory = { name: '', imgUrl: '' };

  openAddModal() {
    this.newProduct = { name: '', price: 0, description: '', stock: 0, category: '' };
    const modal = new bootstrap.Modal(document.getElementById('addModal'));
    modal.show();
  }

  openAddCategoryModal() {
    const modal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
    modal.show();
  }
}
