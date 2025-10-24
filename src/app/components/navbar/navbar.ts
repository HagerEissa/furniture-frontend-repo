import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavouriteService } from '../../core/services/favourite-service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  showMenu = false;
  favCount: number = 0;
  constructor(private _favouriteService:FavouriteService,private _authService:Auth) {}
  ngOnInit(): void {
    let userId:string=this._authService.getUserId();
    if (!userId) return;
    this._favouriteService.getFavouriteForUser(userId).subscribe({
      next: (data:any) => {
        this.favCount = data?.products?.length;
        // console.log("nav fav",data.products.length);
        
      },
      error: (error) => console.log('Error ', error),
    });
  }
  



  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
