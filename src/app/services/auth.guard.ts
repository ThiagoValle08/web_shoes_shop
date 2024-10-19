import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Permite el acceso si el usuario está autenticado
  } else {
    router.navigate(['/login']); // Redirige a la página de inicio de sesión si no está autenticado
    return false;
  }
};
