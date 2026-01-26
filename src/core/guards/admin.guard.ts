import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.getSession().pipe(
    map((user) => {
      if (!user || !user.role) {
        router.navigate(['/']);
        return false;
      }
      if (user.role !== 'admin') {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
