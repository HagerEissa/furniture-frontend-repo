import { Component } from '@angular/core';
import { Banner } from "../../components/banner/banner";
import { HeroShop } from '../../components/hero-shop/hero-shop';
import { ControlBar } from '../../components/control-bar/control-bar';
import { Products } from "../../components/products/products";

@Component({
  selector: 'app-shop',
  imports: [Banner, HeroShop, ControlBar, Products],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {

}
