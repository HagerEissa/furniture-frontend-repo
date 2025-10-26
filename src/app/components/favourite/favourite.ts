import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroFavourite } from "../hero-favourite/hero-favourite";
import { FavouriteService } from '../../core/services/favourite-service';
import { Auth } from '../../core/services/auth';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favourite',
  imports: [MatIconModule, HeroFavourite,CurrencyPipe],
  templateUrl: './favourite.html',
  styleUrl: './favourite.css'
})
export class Favourite implements OnInit {
  constructor(private _favouriteService:FavouriteService,private _authService:Auth) {}
  favourites:any;
  userId:any ;
  totalPrice: number = 0;
  
  loadFavourite() {
    this._favouriteService.getFavouriteForUser(this.userId).subscribe({
      next: (data:any)=> {
        this.favourites = data?.products
        ?.filter((p: any) => p.productId != null)
        ?.map((p: any) => p.productId) || []; //now in this.favourites = [{},{},{}]
        this.totalPrice = 0;
         data?.products
         ?.filter((p: any) => p.productId != null)
         ?.forEach((p: any) => {
          this.totalPrice +=p.productId.price
        })
        console.log("Favourite Response:", data?.products);
       },
       error: (error) => console.log("Error ", error)
    })
  }

  ngOnInit(): void {
    this.userId =this._authService.getUserId();
    if (!this.userId) {
      console.log('User not found or not logged in');
      return;
    }
    this.loadFavourite();
  }

  removeItem(id: number) {
    this._favouriteService.deleteFromFavourite(this.userId, id).subscribe({
      next: (data:any)=> {
        this.loadFavourite();
        console.log("Favourite deleted:", data);
       },
       error: (error) => console.log("Error ", error)
    })
  }

  clearAll() {
    this._favouriteService.clearFavourite(this.userId).subscribe({
      next: (data:any)=> {
        this.loadFavourite();
        console.log("Favourite cleared:", data);
       },
       error: (error) => console.log("Error ", error)
    })
  }

}
