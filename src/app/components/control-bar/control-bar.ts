import { Component, OnInit } from '@angular/core';
import { ProductStateService } from '../../core/services/product-state.service';
import { CategoryService } from '../../core/services/category-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-bar.html',
  styleUrls: ['./control-bar.css'],
})
export class ControlBar implements OnInit {
  searchText = '';
  sortOption = 'default';
  filterOption = 'all';
  showFilterMenu = false;
  categories: any[] = [];

  constructor(
    private state: ProductStateService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data || [],
      error: (err) => console.error(err)
    });
  }

  onSearchChange() {
    this.state.setSearch(this.searchText);
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortOption = select.value;
    this.state.setSort(this.sortOption);
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  onFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filterOption = select.value;
    this.state.setFilter(this.filterOption);
  }
}
