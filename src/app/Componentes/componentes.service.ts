import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModeloRespuesta } from '../Modelos/ModeloRespuesta';
import { Observable, catchError, map, of } from 'rxjs';
import { Rutas } from '../Modelos/ModeloRutas';

@Injectable({
    providedIn: 'root',
})
export class ComponentesService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    obtenerRutas(): Observable<ModeloRespuesta<Rutas>> {
        const url = `${this.baseUrl}/permisos/consultas/rutas`;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<Rutas>>(url, { headers: headers }).pipe(
            map((resp: ModeloRespuesta<Rutas>) => resp),
            catchError((err: HttpErrorResponse) => of(err.error))
        );
    }
}
