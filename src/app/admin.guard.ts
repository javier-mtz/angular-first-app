import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './Services/authService/auth.service';
import { map } from 'rxjs';
import { User } from './Interfaces/user';

export const AdminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routerService = inject(Router);
  if(authService.isLoggedIn()){
    return authService.getCurrentAuthUser().pipe(
      map((user: User) => {
        if (user && user.role === 'Admin') {
          return true;
        } else {
          routerService.navigate(['/home']);
          return false;
        }
      })
    );
  } else {
    routerService.navigate(['/home']);
    return false;
  }
};
