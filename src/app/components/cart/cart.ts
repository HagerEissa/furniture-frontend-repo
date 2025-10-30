import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroCart } from "../hero-cart/hero-cart";

import { CartService } from '../../core/services/cart-service';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [MatIconModule, HeroCart,CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
  })

export class Cart implements OnInit{
  products_in_cart:any;
  userId:any ;
  totalPrice: number = 0;
  quantity: number = 1;
  quantityArr:any
  constructor(private _cartService:CartService,private _authService:Auth,private router: Router) {}

  load_Products_in_cart() {
    this.userId =this._authService.getUserId();
    this._cartService.getCartForUser(this.userId).subscribe({
      next: (data:any)=> {
        this.products_in_cart = data?.products
        ?.filter((p: any) => p.productId != null)
        ?.map((p: any) => ({...p.productId,quantity:p.quantity})) || []; 

        this.totalPrice = 0;
         data?.products
         ?.filter((p: any) => p.productId != null)
         ?.forEach((p: any) => {
          this.totalPrice +=p.productId.price*p.quantity
        })
        console.log("cart Response:", this.products_in_cart);
        console.log("cart Quantity:", data.products);
       },
       error: (error) => console.log("Error ", error)
    })
  }


  ngOnInit(): void {
    this.userId =this._authService.getUserId();
    if (!this.userId) {
      return;
    }
    this.load_Products_in_cart();
  }

  removeItem(id: string) {
    this._cartService.deleteProductFromCart(this.userId, id).subscribe({
      next: (data:any)=> {
        this.load_Products_in_cart();
        console.log("cart deleted and data now:", data);
       },
       error: (error) => console.log("Error ", error)
    })
  }

  decreaseQuantity(product: any) {
    // console.log(product);
    if (product.quantity > 1) {
      this._cartService.updateQuantity(this.userId,product._id,product.quantity - 1).subscribe({
        next: (data:any)=> {
          this.load_Products_in_cart();
          console.log("Quantity decreased:", data);
         },
         error: (error) => console.log("Error ", error)
      })
    }
    
  }
  increaseQuantity(product: any) {
    if (product.quantity < product.stock) {
      this._cartService.updateQuantity(this.userId,product._id,product.quantity + 1).subscribe({
        next: (data:any)=> {
          this.load_Products_in_cart();
          console.log("Quantity increased:", data);
        },
        error: (error) => console.log("Error ", error)
      })
    }else {
    alert(`Only ${product.stock} items are available in stock now.`);
  }
}

goToCheckout() {
  
  localStorage.setItem('cartItems', JSON.stringify(this.products_in_cart));
  localStorage.setItem('totalPrice', this.totalPrice.toString());

  this.router.navigate(['/Checkout']);
}

}
