import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { OrderService } from '../../core/services/order-service';
import { HeroCheckout } from '../../components/hero-checkout/hero-checkout';
import { Banner } from '../../components/banner/banner';
import { FormCheckout } from '../../components/form-checkout/form-checkout';

@Component({
  selector: 'app-checkout',
  imports:[HeroCheckout,Banner,FormCheckout],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  userId = 'user_id_here'; 
  shippingInfo = {
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: ''
  };
  paymentMethod: string = 'cash';

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartForUser(this.userId).subscribe({
      next: (res: any) => {
        this.cartItems = res.items; 
        this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      error: (err) => console.error('Failed to load cart:', err)
    });
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderData = {
      products: this.cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      totalPrice: this.totalPrice,
      shippingInfo: this.shippingInfo,
      paymentMethod: this.paymentMethod
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res: any) => {
        alert(' Order created successfully!');
        this.cartService.clearCart(this.userId).subscribe(() => {
          this.cartItems = [];
          this.totalPrice = 0;
        });
      },
      error: (err) => {
        console.error(' Failed to create order:', err);
        alert('Failed to create order');
      }
    });
  }
}
