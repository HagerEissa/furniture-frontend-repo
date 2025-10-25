import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { ReviewService } from '../../core/services/review-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductReview } from '../product-review/product-review';
import { FavouriteService } from '../../core/services/favourite-service';
import { CartService } from '../../core/services/cart-service';
import { Auth } from '../../core/services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ProductReview, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {


  product: any;
  allReviews: any[] = [];
  productId: string | null = null;

  cart: boolean = false;
  wishlist: boolean = false;
  quantity: number = 1;
  userId: string = '';


  constructor(private _productService: ProductService, private _reviewService: ReviewService, private route: ActivatedRoute,
    private _favouriteService: FavouriteService,
    private _cartService: CartService,
    private _authService: Auth,
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.userId = this._authService.getUserId();

    console.log('Product id', this.productId);

    this._productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        console.log('product details', data);
      },
      error: (error) => console.log('Error ', error),
    });


    this._reviewService.getReviewsByProductId(this.productId).subscribe({
      next: (data: any) => {
        this.allReviews = data;
        console.log('reviews lst', data);
      },
      error: (error) => console.log('Error ', error),
    });


    this._cartService.getCartForUser(this.userId).subscribe({
      next: (data: any) => {
        const cartlst = data.products.find((p: any) => p.productId._id.toString() === this.productId?.toString());
        if (cartlst) {
          this.cart = true;
          this.quantity = cartlst.quantity;
        } else {
          this.cart = false;
          this.quantity = 1;
        }
        console.log('cart lst shuud', data);
      },
      error: (error) => console.log('Error ', error),
    });



    this._favouriteService.getFavouriteForUser(this.userId).subscribe({
      next: (data: any) => {
        this.wishlist = data.products.find((p: any) => p.productId._id.toString() === this.productId?.toString());

        console.log('wishlst shuud', data);

      },
      error: (error) => console.log('Error ', error),


    });

  }

  toggleCart() {
    if (this.cart) {
      this._cartService.deleteProductFromCart(this.userId, this.productId).subscribe(() => {
        this.cart = false;
        this.quantity = 1;
      });
    } else {
      this._cartService.addToCart({
        userId: this.userId,
        productId: this.productId,
        quantity: this.quantity
      }).subscribe(() => {
        this.cart = true;
      });
    }
  }

  toggleWishlist() {
    if (!this.productId || !this.userId) return;

    if (this.wishlist) {
      this._favouriteService.deleteFromFavourite(this.userId, this.productId).subscribe(() => {
        this.wishlist = false;
      });
    } else {
      this._favouriteService.addToFavourite({
        userId: this.userId,
        productId: this.productId
      }).subscribe(() => {
        this.wishlist = true;
      });
    }
  }




  getAverageRating() {
    if (this.allReviews.length === 0) return 0;
    let total = 0;
    for (let review of this.allReviews) {
      total += review.rating;
    }
    return Math.round(total / this.allReviews.length);
  }

}