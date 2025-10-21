import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { Signup } from "./components/signup/signup";
import { Login } from "./components/login/login";
import { SignupWithMail } from "./components/signup-with-mail/signup-with-mail";
import { Favourite } from "./components/favourite/favourite";
import { Cart } from "./components/cart/cart";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, Signup, Login, SignupWithMail, Favourite, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
