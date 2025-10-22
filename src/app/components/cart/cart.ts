import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroCart } from "../hero-cart/hero-cart";

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, HeroCart],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
favourites = [
    {
      id: 1,
      name: 'Asgaard Sofa',
      price: 250000,
      image: 'grid-6.png' ,
      Quantity:5
    },
    {
      id: 2,
      name: 'Nordic Chair',
      price: 120000,
      image: 'grid-6.png',
      Quantity:3
    },
    {
      id: 3,
      name: ' Chair',
      price: 180000,
      image: 'grid-8.png',
      Quantity:2
    }
  ];

  removeItem(id: number) {
    this.favourites = this.favourites.filter(item => item.id !== id);
  }


  get totalPrice() {
  return this.favourites.reduce((sum, item) => sum + item.price * item.Quantity, 0);
}

increaseQuantity(item: any) {
  item.Quantity++;
}

decreaseQuantity(item: any) {
  if (item.Quantity > 1) {
    item.Quantity--;
  }
}
}
