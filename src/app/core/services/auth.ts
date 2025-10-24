import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private _http: HttpClient) {}
  URL_DB = 'http://localhost:3000/api';
  login(data: any) {
    return this._http.post(`${this.URL_DB}/login`, data);
  }
  register(data: any) {
    return this._http.post(`${this.URL_DB}/register`, data);
  }

  loginWithGoogle() {
    window.location.href = `${this.URL_DB}/auth/google`;
  }

  loginWithFacebook() {
    window.location.href = `${this.URL_DB}/auth/facebook`;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId() {
    const user = this.getUser();
    return user ? user._id : null;
  }
  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id || payload.userId || null;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
 


