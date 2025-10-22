import { Component } from '@angular/core';
import { HeroCheckout } from '../../components/hero-checkout/hero-checkout';
import { FormCheckout } from '../../components/form-checkout/form-checkout';
import { Banner } from '../../components/banner/banner';

@Component({
  selector: 'app-checkout',
  imports: [HeroCheckout,FormCheckout,Banner],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

}
