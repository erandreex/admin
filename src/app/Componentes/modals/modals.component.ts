import { Component } from '@angular/core';
import { ModalsService } from './modals.service';
import { ModeloRespuesta } from '../../Modelos/ModeloRespuesta';
import { HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { ModeloError } from '../../Modelos/ModeloError';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.css'],
})
export class ModalsComponent {
    public error!: HttpErrorResponse;

    public mensaje: string = '';
    public status: string = '';

    constructor(private modalsService: ModalsService, private authService: AuthService, private router: Router) {
        this.modalsService.modal$.subscribe((http) => {
            this.error = http;
            const headers: HttpHeaders = http.headers;
            const status: number = http.status;
            const statusText: string = http.statusText;
            const url: string | null = http.url;
            const mensaje: string | null = http.message;
            const name: string | null = http.name;
            const ok: boolean = http.ok;
            const resp: ModeloRespuesta<any> = http.error;
            const errorResp: ModeloError = resp.error;

            console.log('headers', headers);
            console.log('status', status);
            console.log('statusText', statusText);
            console.log('url', url);
            console.log('mensaje', mensaje);
            console.log('ok', ok);
            console.log('name', name);
            console.log('resp', resp);
            console.log('errorResp', errorResp);

            this.mensaje = resp.mensaje;
            this.abrirModal();
        });
    }

    btnAceptar() {
        $('.modal').modal('hide');

        if (this.status == 'INTERNAL_SERVER_ERROR') {
            this.router.navigateByUrl('/login');
        }

        if (this.status.includes('UNAUTHORIZED')) {
            this.router.navigateByUrl('/login');
        }
    }

    abrirModal() {
        let control: boolean = false;
        let resp: ModeloRespuesta<any> = this.error.error;

        let status: string = resp.status;
        let code: number = resp.code;

        console.log(status, code);

        this.status = status;

        if (status == 'INTERNAL_SERVER_ERROR') {
            $('.modal').modal('hide');

            $('#myModalOficial').modal('show');
        }

        if (status.includes('UNAUTHORIZED')) {
            $('.modal').modal('hide');

            $('#myModalOficial').modal('show');
        }
    }
}
