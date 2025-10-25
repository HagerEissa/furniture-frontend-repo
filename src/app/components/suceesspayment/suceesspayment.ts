
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suceesspayment',
  standalone: true,
  imports: [CommonModule],
   templateUrl: './suceesspayment.html',
  styleUrl: './suceesspayment.css'
})
export class PaymentSuccessComponent {
  constructor(private router: Router) {}

  continueShopping() {
    this.router.navigate(['/shop']); 
  }
}
