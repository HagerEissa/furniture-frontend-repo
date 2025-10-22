import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from './../../../../customvalidators/password.validators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {
  hide = true;

  registerationForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, PasswordValidator.passwordStrength()]),
    phone: new FormControl(null, [Validators.minLength(11), Validators.required]),
  });

  get FormValid() {
    return this.registerationForm.valid;
  }

  get emailValid() {
    return this.registerationForm.controls.email.valid;
  }
  get passwordValid() {
    return this.registerationForm.controls.password.valid;
  }
  get phoneValid() {
    return this.registerationForm.controls.phone.valid;
  }

  register() {
    console.log(this.registerationForm);
  }
}
