import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { environment } from 'src/environments/environment.development';
import { ModeloGraficaConsulta, ModeloRespuestaGraficaConsulta } from './ModeloGrafica';

@Injectable({
    providedIn: 'root',
})
export class GraficaService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    consultaGrafica(body: ModeloGraficaConsulta): Observable<ModeloRespuesta<ModeloRespuestaGraficaConsulta>> {
        const url = `${this.baseUrl}/dashboard/consulta/grafica`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<ModeloRespuestaGraficaConsulta>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
