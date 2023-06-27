import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Rutas } from '../../Modelos/ModeloRutas';
import { ModeloRespuesta } from '../../Modelos/ModeloRespuesta';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    private apiUrl: string = environment.baseUrl;
    private baseUrl: string = '/permisos/consultas';

    constructor(private http: HttpClient) {}

    obtenerRutas(): Observable<ModeloRespuesta<Rutas>> {
        const url = `${this.apiUrl}${this.baseUrl}/rutas`;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<Rutas>>(url, { headers: headers }).pipe(
            map((resp: ModeloRespuesta<Rutas>) => resp),
            catchError((err: HttpErrorResponse) => of(err.error))
        );
    }
}
