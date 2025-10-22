import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PasswordValidator } from './../../../../customvalidators/password.validators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, PasswordValidator .passwordStrength()]),
  });

  get FormValid() {
    return this.loginForm.valid;
  }

  get emailValid() {
    return this.loginForm.controls.email.valid;
  }

  get passwordValid() {
    return this.loginForm.controls.password.valid;
  }

  login() {
    console.log(this.loginForm.value);
  }

  loginWithGoogle() {
    console.log('Google login clicked');
  }

  loginWithFacebook() {
    console.log('Facebook login clicked');
  }

  loginWithGithub() {
    console.log('GitHub login clicked');
  }
}
