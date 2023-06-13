import { inject } from '@angular/core';
import {
    Router,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    createUrlTreeFromSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/Servicios/auth.service';

export const routeGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.route();
};
