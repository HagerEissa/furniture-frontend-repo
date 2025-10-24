import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthStateService } from '../../core/services/auth-state.service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  showMenu = false;
  isLoggedIn = false;

  constructor(private authState: AuthStateService, private auth: Auth, private router: Router) {
    this.authState.isLoggedIn$.subscribe((status) => (this.isLoggedIn = status));
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
 

