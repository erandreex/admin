import { Component, OnInit } from '@angular/core';
import { RutasService } from './rutas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Servicios/auth.service';
import { ModeloPaginacion } from 'src/app/Componentes/pagination/ModeloPaginacion';
import { Ruta } from './ModeloRutas';
import { delay } from 'rxjs';
import { ModeloError } from 'src/app/Modelos/ModeloError';
declare var $: any;

@Component({
    selector: 'app-rutas',
    templateUrl: './rutas.component.html',
    styleUrls: ['./rutas.component.css'],
})
export class RutasComponent implements OnInit {
    public mensaje: string = '';
    public banderaCargando: boolean = false;
    public rutas: Ruta[] = [];
    public rutasMostrar: Ruta[] = [];
    public rutaSeleccionada!: Ruta | null;
    public rutaCreada!: Ruta | null;
    public error!: ModeloError | null;

    public formularioRutas: FormGroup = this.fb.group({
        id: ['id'],
        titulo: ['titulo', Validators.required],
        orden: ['0', Validators.required],
        ruta: ['ruta', Validators.required],
        icono: ['icono', Validators.required],
        color_1: ['color_1', Validators.required],
        color_2: ['color_2', Validators.required],
        componente: ['componente', Validators.required],
        fk_categoria: ['fk_categoria', Validators.required],
    });

    constructor(private authService: AuthService, private rutasService: RutasService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.obtenerListaRutas();
    }

    obtenerListaRutas() {
        if (!this.authService.auth) return;

        this.rutasService.listar().subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.rutas = resp.respuesta.rutas;
                } else {
                    console.log('Error', resp);
                }
            },
            error: (err) => console.log('Error: ', err),
            complete() {},
        });
    }

    campoNoesValido(campo: string) {
        return this.formularioRutas.controls[campo].errors && this.formularioRutas.controls[campo].touched;
    }

    guardarNuevoUsuario() {
        if (!this.authService.auth) return;

        if (this.formularioRutas.invalid) {
            this.formularioRutas.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.rutasService
            .crear(this.formularioRutas.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaCreada = resp.respuesta.ruta;
                        this.mensaje = resp.mensaje;
                        this.obtenerListaRutas();
                    } else {
                        this.mensaje = resp.mensaje;
                        console.log('Error', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    removerRuta() {
        if (!this.authService.auth) return;

        let id: string = this.rutaSeleccionada!.ruta_id;

        this.banderaCargando = true;
        this.rutasService
            .remover({ id })
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.mensaje = resp.mensaje;
                        this.rutaSeleccionada = null;
                    } else {
                        this.mensaje = resp.mensaje;
                        this.error = resp.error;
                        this.rutaSeleccionada = null;
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    pagination(paginado: ModeloPaginacion<Ruta>) {
        this.rutasMostrar = paginado.itemsArray;
    }

    abrirModal() {
        this.rutaCreada = null;
        this.mensaje = '';
        $('#modalRuta').modal('show');
    }

    cerrarModal(): void {
        $('#modalRuta').modal('hide');
        this.obtenerListaRutas();
    }
}
