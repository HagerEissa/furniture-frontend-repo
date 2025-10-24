import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart-service';

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
  userId = 'user_id_here';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      additionalInfo: [''],
      paymentMethod: ['stripe', Validators.required],
    });

    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartForUser(this.userId).subscribe({
      next: (res: any) => {
        this.cartItems = res.items;
        this.totalCartPrice = this.cartItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      },
      error: (err) => console.error('Failed to load cart:', err)
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid || this.cartItems.length === 0) {
      alert('Please fill the form and make sure your cart is not empty.');
      return;
    }

    const shippingInfo = this.checkoutForm.value;
    const items = this.cartItems.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to continue');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<{ url: string }>(
      'http://localhost:4200/api/payment/create-checkout-session',
      { items, shippingInfo },
      { headers }
    ).subscribe({
      next: (res) => {
        // redirect to Stripe Checkout
        window.location.href = res.url;
      },
      error: (err) => {
        console.error('Payment error:', err);
        alert('Payment failed, please try again.');
      }
    });
  }
}
