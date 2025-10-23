import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from './../../../../customvalidators/password.validators';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';

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

constructor(private _authService:Auth,private router:Router){}


registerationForm = new FormGroup({
  name: new FormControl('', Validators.required),
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

get nameValid() {
  return this.registerationForm.controls.name.valid;
}
get passwordValid() {
  return this.registerationForm.controls.password.valid;
}
get phoneValid() {
  return this.registerationForm.controls.phone.valid;
}




register() {
  if (this.registerationForm.valid) {
      const formData = this.registerationForm.value;
      // console.log('registerationForm data:', formData);

      this._authService.register(formData).subscribe({
        next: (data: any) => {
          // console.log('Register success:', data);
          // this._authService.setToken(data.token);  //store them in local storage
          // this._authService.setUser(data.user);
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Register error:', err);
          alert(err.error.message || 'Registration failed');
        }
      });
    } else {
      console.log('Form invalid');
    }
  }



}
