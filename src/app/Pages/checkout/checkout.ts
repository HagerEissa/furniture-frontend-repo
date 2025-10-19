import { Component } from '@angular/core';
import { HeroCheckout } from '../../components/hero-checkout/hero-checkout';
import { FormCheckout } from '../../components/form-checkout/form-checkout';

@Component({
  selector: 'app-checkout',
  imports: [HeroCheckout,FormCheckout],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

}
