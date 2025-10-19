import { Component } from '@angular/core';
import { Banner } from "../../components/banner/banner";
import { HeroShop } from '../../components/hero-shop/hero-shop';

@Component({
  selector: 'app-shop',
  imports: [Banner,HeroShop],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {

}
