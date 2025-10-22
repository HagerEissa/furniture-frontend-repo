import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroFavourite } from "../hero-favourite/hero-favourite";

@Component({
  selector: 'app-favourite',
  imports: [MatIconModule, HeroFavourite],
  templateUrl: './favourite.html',
  styleUrl: './favourite.css'
})
export class Favourite {
favourites = [
    {
      id: 1,
      name: 'Asgaard Sofa',
      price: 250000,
      image: 'grid-6.png' 
    },
    {
      id: 2,
      name: 'Nordic Chair',
      price: 120000,
      image: 'grid-6.png'
    },
    {
      id: 3,
      name: ' Chair',
      price: 180000,
      image: 'grid-8.png'
    }
  ];

  removeItem(id: number) {
    this.favourites = this.favourites.filter(item => item.id !== id);
  }

  clearAll() {
    this.favourites = [];
  }
  get totalPrice() {
    return this.favourites.reduce((sum, item) => sum + item.price, 0);
  }
}
