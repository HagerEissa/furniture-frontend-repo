import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { AuthStateService } from './core/services/auth-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isLoggedIn = false;

  constructor(private authState: AuthStateService) {
    this.authState.isLoggedIn$.subscribe((status) => (this.isLoggedIn = status));
  }
}
