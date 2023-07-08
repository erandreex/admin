import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import {
    ModeloRutaCategoria,
    RespuestaActualizarRutaCategoria,
    RespuestaCrearRutaCategoria,
    RespuestaListaRutaCategoria,
    RespuestaRemoverRutaCategoria,
} from './ModeloRutaCategoria';

@Injectable({
    providedIn: 'root',
})
export class RutasCategoriasService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaListaRutaCategoria>> {
        const url = `${this.baseUrl}/rutas/categoria/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaListaRutaCategoria>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    crear(body: ModeloRutaCategoria): Observable<ModeloRespuesta<RespuestaCrearRutaCategoria>> {
        const url = `${this.baseUrl}/rutas/categoria/crear`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCrearRutaCategoria>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    actualizar(body: ModeloRutaCategoria): Observable<ModeloRespuesta<RespuestaActualizarRutaCategoria>> {
        const url = `${this.baseUrl}/rutas/categoria/actualizar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaActualizarRutaCategoria>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    remover(body: ModeloRutaCategoria): Observable<ModeloRespuesta<RespuestaRemoverRutaCategoria>> {
        const url = `${this.baseUrl}/rutas/categoria/remover`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaRemoverRutaCategoria>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
