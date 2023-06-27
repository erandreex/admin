import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor,
    HttpBackend,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalsService } from '../../Componentes/modals/modals.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../../Servicios/auth.service';

@Injectable()
export class HttpIntercept implements HttpInterceptor {
    constructor(private modalsService: ModalsService, private authService: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.modalsService.modalInteraction(error);
                return throwError(error);
            })
        );
    }
}
