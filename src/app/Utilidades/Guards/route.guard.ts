import { inject } from '@angular/core';
import {
    Router,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    createUrlTreeFromSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

export const routeGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const componente = route.component?.name || 'IndexComponent';

    if (!componente || componente == 'NotFoundComponent' || componente == 'ForbiddenComponent') {
        return true;
    }

    authService.route(componente).subscribe({
        next: (resp) => {
            authService.auth = true;
            if (resp.ok) {
                localStorage.setItem('token', resp.token);
                authService.auth = true;
            } else {
                router.navigateByUrl('/forbidden');
                console.log('Error', resp);
            }
        },
        error: (err) => console.log('Error: ', err),
        complete() {},
    });

    return true;
};
