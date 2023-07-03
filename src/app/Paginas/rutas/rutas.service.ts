import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { RespuestaCreacionRuta, RespuestaModeloRutas, RutaCreacion } from './ModeloRutas';

@Injectable({
    providedIn: 'root',
})
export class RutasService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaModeloRutas>> {
        const url = `${this.baseUrl}/rutas/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaModeloRutas>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    crear(body: RutaCreacion): Observable<ModeloRespuesta<RespuestaCreacionRuta>> {
        const url = `${this.baseUrl}/rutas/crear`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCreacionRuta>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    remover(body: { id: string }): Observable<ModeloRespuesta<RespuestaCreacionRuta>> {
        const url = `${this.baseUrl}/rutas/remover`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCreacionRuta>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
