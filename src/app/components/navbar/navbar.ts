import { RouterModule, Router } from '@angular/router';
import { AuthStateService } from '../../core/services/auth-state.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../core/services/favourite-service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  showMenu = false;
  isLoggedIn = false;
  favCount = 0;
  isAdminUser = false; 

  constructor(
    private authState: AuthStateService,
    private auth: Auth,
    private router: Router,
    private _favouriteService: FavouriteService,
    private _authService: Auth
  ) {
    this.authState.isLoggedIn$.subscribe((status) => (this.isLoggedIn = status));
  }

  ngOnInit(): void {
    this.isAdminUser = this._authService.isAdmin();

    if (!this.isAdminUser) {
      const userId = this._authService.getUserId();
      if (userId) {
        this._favouriteService.getFavouriteForUser(userId).subscribe({
          next: (data: any) => {
            this.favCount = data?.products?.length || 0;
          },
          error: (error) => console.log('Error ', error),
        });
      }
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.auth.logout();
    this.authState.updateLoginStatus();
    this.router.navigate(['/login']);
  }
}
