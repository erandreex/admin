import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { environment } from 'src/environments/environment.development';
import { ModeloDashboardRespuestaCuadricula } from './ModeloDashboard';

@Injectable({
    providedIn: 'root',
})
export class DashboardBaseService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    consultaGrafica(nombre: string): Observable<ModeloRespuesta<ModeloDashboardRespuestaCuadricula>> {
        const url = `${this.baseUrl}/dashboard/cuadricula/${nombre}`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<ModeloDashboardRespuestaCuadricula>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
