import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { ModeloRutasAcciones, RespuestaModeloRutasAcciones } from './ModeloRutasAcciones';

@Injectable({
    providedIn: 'root',
})
export class RutasAccionesService {
    private baseUrl: string = environment.baseUrl + '/rutas/acciones';

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaModeloRutasAcciones>> {
        const url = `${this.baseUrl}/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<ModeloRutasAcciones[]>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
