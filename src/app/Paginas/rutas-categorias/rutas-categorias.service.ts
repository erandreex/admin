import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import {
    ModeloRutaCategoria,
    RespuestaCreacionRutaCategoria,
    RespuestaModeloRutaCategoria,
} from './ModeloRutaCategoria';

@Injectable({
    providedIn: 'root',
})
export class RutasCategoriasService {
    private baseUrl: string = environment.baseUrl + '/rutas/categoria';
    private lstoken: string = 'token';

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaModeloRutaCategoria>> {
        const url = `${this.baseUrl}/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaModeloRutaCategoria>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    crear(body: ModeloRutaCategoria): Observable<ModeloRespuesta<RespuestaCreacionRutaCategoria>> {
        const url = `${this.baseUrl}/crear`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCreacionRutaCategoria>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
