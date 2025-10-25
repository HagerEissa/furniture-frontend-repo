
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { OrderService } from '../../core/services/order-service';
import { HeroCheckout } from '../../components/hero-checkout/hero-checkout';
import { Banner } from '../../components/banner/banner';
import { FormCheckout } from '../../components/form-checkout/form-checkout';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-checkout',
  imports: [HeroCheckout, Banner, FormCheckout],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
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
    email: '',
  };
  paymentMethod: string = 'cash';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private auth: Auth
  ) {}

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (userId) {
      this.userId = userId;

      // ✅ تحميل الداتا من localStorage بدل الـ API
      const storedCart = localStorage.getItem('cartItems');
      const storedTotal = localStorage.getItem('totalPrice');

      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
        this.totalPrice = storedTotal ? parseFloat(storedTotal) : 0;
      } else {
        console.warn('No cart data found in localStorage');
        this.loadCart(); // fallback لو عايزة تجيبيها من السيرفر لو مش لاقياها
      }
    } else {
      console.error('User not logged in');
    }
  }

  loadCart() {
    this.cartService.getCartForUser(this.userId).subscribe({
      next: (res: any) => {
        // نحاول نجيب الـ items من أكتر من احتمال
        this.cartItems = res?.items || res?.data?.items || res?.cart || res?.data || [];

        // لو في منتجات فعلاً نحسب الإجمالي
        if (this.cartItems.length > 0) {
          this.totalPrice = this.cartItems.reduce(
            (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
            0
          );
        } else {
          this.totalPrice = 0;
          console.warn('Cart is empty or invalid structure:', res);
        }
      },
      error: (err) => console.error('Failed to load cart:', err),
    });
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderData = {
      products: this.cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      totalPrice: this.totalPrice,
      shippingInfo: this.shippingInfo,
      paymentMethod: this.paymentMethod,
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
      },
    });
  }
}
 