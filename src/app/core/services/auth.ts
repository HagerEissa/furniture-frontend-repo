import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private _http:HttpClient){}
      URL_DB = "http://localhost:3000/api"
      login(data:any){
        return this._http.post(`${this.URL_DB}/login`,data)
      }
      register(data:any){
        return this._http.post(`${this.URL_DB}/register`,data)
      }

      // Google Login redirect
      loginWithGoogle() {
        window.location.href = `${this.URL_DB}/auth/google`;
      }

      // Facebook Login redirect
      loginWithFacebook() {
        window.location.href = `${this.URL_DB}/auth/facebook`;
      }

       setToken(token: string) {
          localStorage.setItem('token', token);
        }

        getToken() {
          return localStorage.getItem('token');
        }

        clearToken() {
          localStorage.removeItem('token');
        }

   
}
