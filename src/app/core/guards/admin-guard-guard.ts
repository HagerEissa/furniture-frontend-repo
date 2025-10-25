import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const _authS = inject(Auth);
  const _router = inject(Router);
  if(_authS.isLoggedIn()){
    if(_authS.isAdmin()){
      return true;
    }
    else{
      _router.navigate(['/home']);
      return false;
    }
  }
  return true;
};
