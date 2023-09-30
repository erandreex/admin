import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { ModeloRespuesta } from '../Modelos/ModeloRespuesta';
import { ModeloRespuestaPreferencias, ModeloTema } from '../Modelos/ModelosPreferencias';

@Injectable({
    providedIn: 'root',
})
export class PreferenciasService {
    private baseUrl: string = environment.baseUrl;

    private cambioPreferenciaObs = new Subject<ModeloTema>();
    cambioPreferenciaObs$ = this.cambioPreferenciaObs.asObservable();

    constructor(private http: HttpClient) {}

    cambioPreferencia(preferencias: ModeloTema) {
        this.cambioPreferenciaObs.next(preferencias);
    }

    preferencias(): Observable<ModeloRespuesta<ModeloRespuestaPreferencias>> {
        const url = `${this.baseUrl}/usuarios/preferencias/listar`;
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<ModeloRespuestaPreferencias>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err: HttpErrorResponse) => of(err.error))
        );
    }
}
