import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category-service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css'],
})
export class Categories implements OnInit {
  categories: any[] = [];

  constructor(private _categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories:', data);
      },
      error: (error) => console.log('Error fetching categories:', error),
    });
  }

  goToShop(categoryId: string) {
    this.router.navigate(['/shop'], { queryParams: { category: categoryId } });
  }

  scroll(direction: 'left' | 'right') {
    const container = document.getElementById('categoriesContainer');
    if (container) {
      const scrollAmount = 400;
      const scrollOptions: ScrollToOptions = {
        left:
          direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount,
        behavior: 'smooth',
      };
      container.scrollTo(scrollOptions);
    }
  }
}
