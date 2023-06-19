import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { ModeloUsuario, RespuestaModeloUsuario } from './ModeloUsuario';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    private baseUrl: string = environment.baseUrl + '/usuarios';

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaModeloUsuario>> {
        const url = `${this.baseUrl}/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<ModeloUsuario[]>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    registro(body: ModeloUsuario): Observable<ModeloRespuesta<RespuestaModeloUsuario>> {
        const url = `${this.baseUrl}/registro`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<ModeloUsuario[]>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
