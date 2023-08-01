import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { environment } from 'src/environments/environment.development';
import {
    ModeloPermisosRolRuta,
    RespuestaAgregarPermisoRolRuta,
    RespuestaListaPermisoRolRuta,
    RespuestaRemoverPermisoRolRuta,
} from './ModeloPermisosRolesRutas';

@Injectable({
    providedIn: 'root',
})
export class PermisosRolesRutasService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaListaPermisoRolRuta>> {
        const url = `${this.baseUrl}/permisos/roles/rutas/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<RespuestaListaPermisoRolRuta>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    agregar(body: ModeloPermisosRolRuta): Observable<ModeloRespuesta<RespuestaAgregarPermisoRolRuta>> {
        const url = `${this.baseUrl}/permisos/roles/rutas/agregar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaAgregarPermisoRolRuta>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }

    remover(body: ModeloPermisosRolRuta): Observable<ModeloRespuesta<RespuestaRemoverPermisoRolRuta>> {
        const url = `${this.baseUrl}/permisos/roles/rutas/remover`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.post<ModeloRespuesta<RespuestaRemoverPermisoRolRuta>>(url, body, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
