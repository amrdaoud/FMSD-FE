import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../dashboards/services/account.service';
import { map, of, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountService);
  const router = inject(Router);
  // Check if the route requires roles
  const requiredRoles = route.data?.['roles'] as string[];

  return authService.getDistinctRoles$().pipe(
    take(1),
    map((userRoles) => {
      if (
        !requiredRoles ||
        requiredRoles.some((role) => userRoles.includes(role))
      ) {
        return true;
      }

      //router.navigate(['/unauthorized']);
      return false;
    })
  );
};
