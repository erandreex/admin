import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import {
    RespuestaActualizarRutas,
    RespuestaCrearRutas,
    RespuestaListaRutas,
    RespuestaRemoverRutas,
    Ruta,
} from './ModeloRutas';

@Injectable({
    providedIn: 'root',
})
export class RutasService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaListaRutas>> {
        const url = `${this.baseUrl}/rutas/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaListaRutas>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    crear(body: Ruta): Observable<ModeloRespuesta<RespuestaCrearRutas>> {
        const url = `${this.baseUrl}/rutas/crear`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCrearRutas>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    actualizar(body: Ruta): Observable<ModeloRespuesta<RespuestaActualizarRutas>> {
        const url = `${this.baseUrl}/rutas/actualizar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaActualizarRutas>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    remover(body: { id: string }): Observable<ModeloRespuesta<RespuestaRemoverRutas>> {
        const url = `${this.baseUrl}/rutas/remover`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaRemoverRutas>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
