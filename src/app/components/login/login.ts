import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { PasswordValidor } from './../../../../customvalidators/password.validators';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  hide = true;

  loginForm = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required,PasswordValidor.passwordStrength()]),
  })

    get FormValid(){
    return this.loginForm.valid
    }

    get emailValid(){
      return this.loginForm.controls.email.valid
    }
    get passwordValid(){
      return this.loginForm.controls.password.valid
    }

  login(){
    console.log(this.loginForm);
    
  }
}
