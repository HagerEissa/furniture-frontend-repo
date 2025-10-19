import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./components/login/login";
import { Signup } from "./components/signup/signup";
import { SignupWithMail } from "./components/signup-with-mail/signup-with-mail";
import { Home } from './Pages/home/home';
import { Homegrid } from './components/homegrid/homegrid';
import { Categories } from "./components/categories/categories";
import { Products } from "./components/products/products";
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Signup, SignupWithMail, Home, Homegrid, Categories, Products,Footer,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
