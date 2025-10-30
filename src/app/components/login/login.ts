import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PasswordValidator } from './../../../../customvalidators/password.validators';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { AuthStateService } from '../../core/services/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  hide = true;
  constructor(
    private _authService: Auth,
    private authState: AuthStateService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, PasswordValidator.passwordStrength()]),
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
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this._authService.login(formData).subscribe({
        next: (data: any) => {
          this._authService.setToken(data.token);
          this._authService.setUser(data.user);

          this.authState.updateLoginStatus();
          alert('login successful!');
          this.router.navigate(['/home']);
        },

        error: (err) => {
          console.error('Register error:', err);
          alert(err.error.message || 'Registration failed');
        },
      });
    } else {
      console.log('Form invalid');
    }
  }

  loginWithGoogle() {
    this._authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this._authService.loginWithFacebook();
  }
}
