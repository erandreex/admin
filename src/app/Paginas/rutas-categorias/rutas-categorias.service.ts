import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModeloRespuesta } from 'src/app/Modelos/ModeloRespuesta';
import { Ruta, Rutas } from 'src/app/Modelos/ModeloRutas';
import { RespuestaModeloRutaCategoria } from '../../Modelos/ModeloRutaCategoria';

@Injectable({
    providedIn: 'root',
})
export class RutasCategoriasService {
    private baseUrl: string = environment.baseUrl + '/rutas/categoria';
    private lstoken: string = 'token';

    constructor(private http: HttpClient) {}

    listar(): Observable<ModeloRespuesta<RespuestaModeloRutaCategoria>> {
        const url = `${this.baseUrl}/listar`;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<ModeloRespuesta<Ruta[]>>(url, { headers }).pipe(
            map((resp) => resp),
            catchError((err) => of(err))
        );
    }
}
