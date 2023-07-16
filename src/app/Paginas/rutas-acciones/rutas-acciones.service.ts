import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import {
    ModeloRutasAcciones,
    RespuestaActualizarRutaAccion,
    RespuestaCrearRutaAccion,
    RespuestaListaRutasAcciones,
    RespuestaRemoverRutaAccion,
} from './ModeloRutasAcciones';

@Injectable({
    providedIn: 'root',
})
export class RutasAccionesService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaListaRutasAcciones>> {
        const url = `${this.baseUrl}/rutas/acciones/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaListaRutasAcciones>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    crear(body: ModeloRutasAcciones): Observable<ModeloRespuesta<RespuestaCrearRutaAccion>> {
        const url = `${this.baseUrl}/rutas/acciones/crear`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCrearRutaAccion>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    actualizar(body: ModeloRutasAcciones): Observable<ModeloRespuesta<RespuestaActualizarRutaAccion>> {
        const url = `${this.baseUrl}/rutas/acciones/actualizar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaActualizarRutaAccion>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    remover(body: ModeloRutasAcciones): Observable<ModeloRespuesta<RespuestaRemoverRutaAccion>> {
        const url = `${this.baseUrl}/rutas/acciones/remover`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaRemoverRutaAccion>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
