import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { ModeloUsuario, RespuestaCreacionUsuario, RespuestaModeloUsuario } from './ModeloUsuario';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    private baseURL: string = environment.baseUrl;
    private apiURL: string = '/usuarios';

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaModeloUsuario>> {
        const url = `${this.baseURL}${this.apiURL}/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaModeloUsuario>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    registro(body: ModeloUsuario): Observable<ModeloRespuesta<RespuestaCreacionUsuario>> {
        const url = `${this.baseURL}${this.apiURL}/registro`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCreacionUsuario>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
