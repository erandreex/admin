import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ModeloRespuesta } from '../Modelos/ModeloRespuesta';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public _auth: boolean = true;

    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    get auth(): boolean {
        return this._auth;
    }

    set auth(value: boolean) {
        this._auth = value;
    }

    login(credencial: string, password: string): Observable<ModeloRespuesta<any>> {
        const url = `${this.baseUrl}/auth/login`;
        const body = { credencial, password };

        return this.http.post<ModeloRespuesta<any>>(url, body).pipe(
            tap((resp) => {
                if (resp.ok) {
                    localStorage.setItem('token', resp.token);
                    this.auth = true;
                }
            }),
            map((resp) => resp),
            catchError((err: HttpErrorResponse) => of(err.error))
        );
    }

    route(componente: string): Observable<ModeloRespuesta<any>> {
        const url = `${this.baseUrl}/acceso/ruta/${componente}`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<any>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
