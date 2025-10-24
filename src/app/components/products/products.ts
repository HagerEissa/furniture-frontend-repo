

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductStateService } from '../../core/services/product-state.service';
import { FavouriteService } from '../../core/services/favourite-service';
import { Auth } from '../../core/services/auth';
import { CartService } from '../../core/services/cart-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {
  @Input() limit: number | null = null;

  favouriteProducts: string[] = []; // IDs of favorite products
  allProducts: any[] = []; // store all products to handle add-to-cart/stock check

  constructor(
    private state: ProductStateService,
    private _favouriteService: FavouriteService,
    private _authService: Auth,
    private _cartService: CartService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    const userId = this._authService.getUserId();

    // 🟡 Load user's favourite list
    if (userId) {
      this._favouriteService.getFavouriteForUser(userId).subscribe({
        next: (data: any) => {
          this.favouriteProducts = data.products.map(
            (p: any) => p.productId._id
          );
        },
        error: (error) => console.log('Error ', error),
      });
    }

    // 🟢 Load all products once from the state service
    this.state.displayedProducts$.subscribe((products) => {
      this.allProducts = products;
    });
  }

  get displayedProducts$() {
    return this.state.displayedProducts$;
  }

  // ❤️ Toggle favourite
  toggle_fav(productId: string) {
    const userId: string = this._authService.getUserId();
    if (!userId) {
      alert('You must log in to use favourites.');
      return;
    }

    if (this.favouriteProducts.includes(productId)) {
      this._favouriteService.deleteFromFavourite(userId, productId).subscribe({
        next: () => {
          this.favouriteProducts = this.favouriteProducts.filter(
            (id) => id !== productId
          );
        },
        error: (error) => console.log('Error ', error),
      });
    } else {
      this._favouriteService.addToFavourite({ userId, productId }).subscribe({
        next: () => {
          this.favouriteProducts.push(productId);
        },
        error: (error) => console.log('Error ', error),
      });
    }
  }

  // 🛒 Add to Cart
  add_to_card(productId: string) {
    const userId: string = this._authService.getUserId();
    if (!userId) {
      alert('Please log in to add products to your cart.');
      return;
    }

    const quantity = 1;
    const selectedProduct = this.allProducts.find((p) => p._id === productId);

    if (!selectedProduct) {
      alert('This product is not available right now.');
      return;
    }

    if (selectedProduct.stock === 0) {
      alert(`Sorry, ${selectedProduct.name} is currently out of stock.`);
      return;
    }

    this._cartService.addToCart({ userId, productId, quantity }).subscribe({
      next: (data: any) => console.log('Added to cart:', data),
      error: (error) => {
        if (
          error.error?.message === 'Not enough stock for this quantity' ||
          error.error?.message === 'Not enough stock'
        ) {
          alert(
            `Sorry, only ${selectedProduct.stock} items available in stock.`
          );
        } else {
          console.log('Error ', error);
        }
      },
    });
  }

  // display product details
   goToProductDetail(product: any) {
    this._router.navigate(['/product-detail', product._id]);
}
}

