import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { ModeloRol, RespuestaCreacionRol, RespuestaModeloRol } from './ModeloRoles';

@Injectable({
    providedIn: 'root',
})
export class UsuariosRolesService {
    private apiURL: string = environment.baseUrl;
    private apiAdm: string = 'roles';

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaModeloRol>> {
        const url = `${this.apiURL}/${this.apiAdm}/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaModeloRol>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    crear(body: ModeloRol): Observable<ModeloRespuesta<RespuestaCreacionRol>> {
        const url = `${this.apiURL}/${this.apiAdm}/crear`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaCreacionRol>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    remover(body: ModeloRol): Observable<ModeloRespuesta<null>> {
        const url = `${this.apiURL}/${this.apiAdm}/remover`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<null>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
