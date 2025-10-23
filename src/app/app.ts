import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';

// import { SignupWithMail } from "./components/signup-with-mail/signup-with-mail";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Footer } from './components/footer/footer';
// import { Navbar } from './components/navbar/navbar';
// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, Footer, Navbar],
//   standalone: true,
//   templateUrl: './app.html',
//   styleUrls: ['./app.css'],
// })
// export class App implements OnInit {
//   ngOnInit() {}

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }
// }
