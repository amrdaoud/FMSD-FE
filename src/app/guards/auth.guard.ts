import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../dashboards/services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountService);
  const router = inject(Router);
  const isAuthenticated = authService.logging$; // boolean or observable
  // Check if the route requires roles

  const requiredRoles = route.data?.['roles'] as string[];
  const userRoles = ['Admin', 'Group2'];
  if (isAuthenticated) {
    if (
      !requiredRoles ||
      requiredRoles.some((role) => userRoles.includes(role))
    ) {
      return true;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
  return false;
};
