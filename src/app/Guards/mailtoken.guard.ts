import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/authService/auth.service';
import { AlertService } from '../Services/alertService/alert.service';
import { combineLatest } from 'rxjs';

export const MailTokenGuard: CanActivateFn = (route, state) => {
  let routerService = inject(Router);
  let authService = inject(AuthService);
  let alertService = inject(AlertService);

  const token = route.paramMap.get('token');
  if (token) {
    fetch('http://localhost:3000/api/auth/mailToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
        alertService.showToast('Bienvenido, debes cambiar tu contraseña', 'success');
        authService.mailLogin(data);
        routerService.navigate(['/user']);
      })
      .catch(error => {
        alertService.showToast('Tu link ha expirado', 'error');
        routerService.navigate(['/home']);
      });

    return false;
  } else {
    alertService.showToast('Tu link ha expirado', 'error');
    routerService.navigate(['/home']);
    return false;
  }
};
