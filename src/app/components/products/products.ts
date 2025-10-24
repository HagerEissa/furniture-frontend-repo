import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { FavouriteService } from '../../core/services/favourite-service';
import { Auth } from '../../core/services/auth';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: any;
  // added_flag: boolean = false;
  favouriteProducts: string[] = []; // Array has favourite product IDs
  @Input() limit: number | null = null;

  constructor(private _productService: ProductService,private _favouriteService:FavouriteService,private _authService:Auth,private _cartService:CartService) {}

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (data:any) => {
        this.products =data;
        console.log(data);
      },
      error: (error) => console.log('Error ', error),
    });
    let userId:string=this._authService.getUserId();
    this._favouriteService.getFavouriteForUser(userId).subscribe({
      next: (data:any) => {
        this.favouriteProducts = data.products.map((p: any) => p.productId._id);
        console.log("favouriteProducts",this.favouriteProducts);
      },
      error: (error) => console.log('Error ', error),
    });
  }

  toggle_fav(productId:string){
    let userId:string=this._authService.getUserId();
    if (this.favouriteProducts.includes(productId)) {    
      this._favouriteService.deleteFromFavourite(userId,productId).subscribe({
        next: (data:any) => {
          this.favouriteProducts = this.favouriteProducts.filter(id => id !== productId);
          console.log(data);
        },
        error: (error) => console.log('Error ', error),
      });
    }
    else {
      this._favouriteService.addToFavourite({userId,productId}).subscribe({
        next: (data:any) => {
          console.log(data);
          this.favouriteProducts.push(productId);
        },
        error: (error) => console.log('Error ', error),
      });
      }
  }



  // handle add to cart
add_to_card(productId: string) {
  let userId: string = this._authService.getUserId();
  let quantity: number = 1;

  const selectedProduct = this.products.find((p: any) => p._id === productId);

  if (!selectedProduct) {
    alert("This product is not available right now.");
    return;
  }

  if (selectedProduct.stock === 0) {
    alert(`Sorry, ${selectedProduct.name} is currently out of stock.`);
    return;
  }

  this._cartService.addToCart({ userId, productId, quantity }).subscribe({
    next: (data: any) => {
      console.log(data);
    },
    error: (error) => {
      if (error.error?.message === "Not enough stock for this quantity") {
        alert(`Sorry, only ${selectedProduct.stock} items available in stock.`);
      } else {
        console.log("Error ", error);
      }
    },
  });
}
 
}
