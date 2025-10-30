import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../../core/services/auth'; 

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private auth: Auth) {
    this.loggedIn.next(this.auth.isLoggedIn());
  }

  updateLoginStatus() {
    this.loggedIn.next(this.auth.isLoggedIn());
  }
}
