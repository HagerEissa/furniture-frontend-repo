import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const _authS = inject(Auth);
  const _router = inject(Router);
  if(_authS.isLoggedIn()){
  return true;
  }
  else
  {
    _router.navigate(['/login']);
    return false;
  }
};
