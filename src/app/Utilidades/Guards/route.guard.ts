import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

export const routeGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const componente = route.component?.name || 'UndefinedComponent';

    console.log(componente);
    console.log(authService.auth);

    if (componente == 'UndefinedComponent' && !authService.auth) {
        router.navigate(['login']);

        return false;
    }

    if (componente == 'UndefinedComponent' && authService.auth) {
        return true;
    }

    authService.route(componente).subscribe({
        next: (resp) => {
            if (resp.ok) {
                localStorage.setItem('token', resp.token);
                authService.auth = true;
                return true;
            } else {
                if (authService.auth) {
                    router.navigate(['forbidden']);
                    console.log('Error', resp);
                    return true;
                } else {
                    router.navigate(['login']);
                    console.log('Error', resp);
                    return false;
                }
            }
        },
        error: (err) => console.log('Error aqui pues: ', err),
        complete() {},
    });
};
