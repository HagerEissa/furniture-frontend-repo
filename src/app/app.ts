import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./components/login/login";
import { Signup } from "./components/signup/signup";
import { SignupWithMail } from "./components/signup-with-mail/signup-with-mail";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Signup, SignupWithMail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
