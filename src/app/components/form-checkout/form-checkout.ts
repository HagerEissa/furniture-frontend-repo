import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart-service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-form-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-checkout.html',
  styleUrls: ['./form-checkout.css'],
})
export class FormCheckout implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  totalCartPrice: number = 0;
  userId = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private auth: Auth
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userId = JSON.parse(storedUser)._id;
    } else {
      alert('User not logged in!');
      this.router.navigate(['/login']);
      return;
    }

    console.log('User ID:', this.userId);

    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      additionalInfo: [''],
      paymentMethod: ['cash', Validators.required],
    });

    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cartItems');
    const storedTotal = localStorage.getItem('totalPrice');

    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.totalCartPrice = storedTotal ? parseFloat(storedTotal) : 0;
      console.log('Loaded cart from localStorage:', this.cartItems);
    } else {
      this.cartService.getCartForUser(this.userId).subscribe({
        next: (res: any) => {
          this.cartItems =
            res?.products?.map((p: any) => ({
              ...p.productId,
              quantity: p.quantity,
            })) || [];
          this.totalCartPrice = this.cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        },
        error: (err) => console.error('Failed to load cart from API:', err),
      });
    }
  }

  onSubmit() {
    if (this.checkoutForm.invalid || this.cartItems.length === 0) {
      alert('Please fill the form and make sure your cart is not empty.');
      return;
    }

    const paymentMethod = this.checkoutForm.value.paymentMethod;

    if (paymentMethod === 'cash') {
      this.router.navigate(['/payment-success']);
      return;
    }

    const shippingInfo = this.checkoutForm.value;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to continue');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const payload = {
      userId: this.userId,
      items: this.cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      totalPrice: this.totalCartPrice,
      shippingInfo,
      paymentMethod,
    };

    this.http
      .post<{ url: string }>(
        'https://insightful-stillness-production.up.railway.app/api/payment/create-checkout-session',
        payload,
        {
          headers,
        }
      )
      .subscribe({
        next: (res) => {
          window.location.href = res.url;
        },
        error: (err) => {
          console.error('Payment error:', err);
          alert('Payment failed, please try again.');
        },
      });
  }
}
