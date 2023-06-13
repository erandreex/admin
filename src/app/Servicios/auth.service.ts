import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ModeloRespuesta } from '../Modelos/ModeloRespuesta';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public _auth: boolean = false;

    private baseUrl: string = environment.baseUrl;
    private lstoken: string = 'token';

    constructor(private http: HttpClient) {}

    registro(email: string, password: string) {
        const url = `${this.baseUrl}/auth/registro`;
        const body = { email, password };

        return this.http.post<ModeloRespuesta<any>>(url, body).pipe(
            tap((resp) => {
                if (resp.ok) {
                    localStorage.setItem(this.lstoken, resp.token);
                }
            }),
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    login(credencial: string, password: string): Observable<ModeloRespuesta<any>> {
        const url = `${this.baseUrl}/auth/login`;
        const body = { credencial, password };

        return this.http.post<ModeloRespuesta<any>>(url, body).pipe(
            tap((resp) => {
                console.log(resp);
                if (resp.ok) {
                    localStorage.setItem(this.lstoken, resp.token);
                }
            }),
            map((resp) => resp),
            catchError((err: HttpErrorResponse) => of(err.error))
        );
    }

    route(): boolean {
        return true;
    }
}
