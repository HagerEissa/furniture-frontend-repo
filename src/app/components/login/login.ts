import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PasswordValidator } from './../../../../customvalidators/password.validators';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';

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
constructor(private _authService:Auth,private router:Router){}

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

  login(){
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
       this._authService.login(formData).subscribe({
        next: (data: any) => {
          // console.log('login success:', data);
          this._authService.setToken(data.token);  //store them in local storage
          this._authService.setUser(data.user);
          alert('login successful!');
          this.router.navigate(['/home']);

        },
        error: (err) => {
          console.error('Register error:', err);
          alert(err.error.message || 'Registration failed');
        }
      });
    }else{
      console.log('Form invalid');
    }
  }

  loginWithGoogle() {
  this._authService.loginWithGoogle(); // redirect للباك
  }

  loginWithFacebook() {
    this._authService.loginWithFacebook(); // redirect للباك
  }
}
