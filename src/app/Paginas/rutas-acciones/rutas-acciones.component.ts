import { Component, OnInit } from '@angular/core';
import { RutasAccionesService } from './rutas-acciones.service';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    ModeloExternoRuta,
    ModeloExternoRutaCategorias,
    ModeloOpcionesHttp,
    ModeloRutasAcciones,
} from './ModeloRutasAcciones';
import { ModeloError } from 'src/app/Modelos/ModeloError';
import { delay } from 'rxjs';
import { ModeloPaginacion } from 'src/app/Componentes/pagination/ModeloPaginacion';
declare let $: any;

@Component({
    selector: 'app-rutas-acciones',
    templateUrl: './rutas-acciones.component.html',
    styleUrls: ['./rutas-acciones.component.css'],
})
export class RutasAccionesComponent implements OnInit {
    public rutasAcciones: ModeloRutasAcciones[] = [];
    public rutasAccionesMostrar: ModeloRutasAcciones[] = [];

    public rutasLista: ModeloExternoRuta[] = [];
    public rutasCategoriasLista: ModeloExternoRutaCategorias[] = [];
    public rutasListaMostrar: ModeloExternoRuta[] = [];
    public opcionesHttp: ModeloOpcionesHttp[] = [];

    public rutaAccionCreadaActualizada: ModeloRutasAcciones | null = null;

    public rutasAccionSeleccionada: ModeloRutasAcciones | null = null;

    public rutasCategoriaSeleccionada: string = '';

    public banderaCrear: boolean = false;
    public banderaCargando: boolean = false;

    public mensaje: string = '';
    public error!: ModeloError | null;

    public formularioRutasAcciones: FormGroup = this.fb.group({
        id: ['id'],
        controlador: ['controlador', Validators.required],
        endpoint: ['endpoint', Validators.required],
        metodo: ['metodo', Validators.required],
        estado: ['estado', Validators.required],
        descripcion: ['descripcion', Validators.required],
        categoria_id: [''],
        ruta_id: ['ruta_id', Validators.required],
    });

    constructor(
        private authService: AuthService,
        private rutasAccionesService: RutasAccionesService,
        private fb: FormBuilder
    ) {}
    ngOnInit(): void {
        this.obtenerListaRutas();
    }

    onListenerChangeCategoria(valor: Event) {
        const { value } = valor.target as HTMLInputElement;
        this.rutasCategoriaSeleccionada = value;
        this.rutasListaMostrar = this.rutasLista.filter((e) => e.categoria_id == value);
    }

    obtenerListaRutas() {
        if (!this.authService.auth) return;

        this.rutasAccionesService.listar().subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.rutasAcciones = resp.respuesta['rutas-acciones'];
                    this.rutasLista = resp.respuesta.rutas;
                    this.rutasCategoriasLista = resp.respuesta['rutas-categorias'];
                    this.opcionesHttp = resp.respuesta['metodos-http'];
                } else {
                    console.log('Error: ', resp);
                }
            },
            error: (err) => console.log('Error: ', err),
            complete() {},
        });
    }

    campoNoesValido(campo: string) {
        return (
            this.formularioRutasAcciones.controls[campo].errors && this.formularioRutasAcciones.controls[campo].touched
        );
    }

    abrirModalFormulario() {
        this.rutaAccionCreadaActualizada = null;
        this.rutasCategoriaSeleccionada = '';

        if (this.banderaCrear) {
            this.rutasAccionSeleccionada = null;
            this.formularioRutasAcciones.reset();
        } else {
            this.formularioRutasAcciones.patchValue(this.rutasAccionSeleccionada!);
            this.rutasCategoriaSeleccionada = this.rutasAccionSeleccionada!.categoria_id;
            this.rutasListaMostrar = this.rutasLista.filter((e) => e.categoria_id == this.rutasCategoriaSeleccionada);
        }
        this.mensaje = '';

        $('#modalFormularuioRutaAccion').modal('show');
    }

    btnGuardarActualizar() {
        if (!this.authService.auth) return;

        if (this.formularioRutasAcciones.invalid) {
            this.formularioRutasAcciones.markAllAsTouched();
            return;
        }

        if (this.banderaCrear) {
            this.guardarNuevaRutaAccion();
        } else {
            this.actualizarRutaAccion();
        }
    }

    guardarNuevaRutaAccion() {
        if (!this.authService.auth) return;

        if (this.formularioRutasAcciones.invalid) {
            this.formularioRutasAcciones.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.rutasAccionesService
            .crear(this.formularioRutasAcciones.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaAccionCreadaActualizada = resp.respuesta['ruta-accion'];
                        this.mensaje = resp.mensaje;
                        this.obtenerListaRutas();
                    } else {
                        this.mensaje = resp.mensaje;
                        this.error = resp.error;
                        console.log('Error: ', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    actualizarRutaAccion() {
        if (!this.authService.auth) return;

        if (this.formularioRutasAcciones.invalid) {
            this.formularioRutasAcciones.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.rutasAccionesService
            .actualizar(this.formularioRutasAcciones.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaAccionCreadaActualizada = resp.respuesta['ruta-accion'];
                        this.mensaje = resp.mensaje;
                        this.obtenerListaRutas();
                    } else {
                        this.mensaje = resp.mensaje;
                        this.error = resp.error;
                        console.log('Error: ', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    cerrarModal(): void {
        $('#modalFormularuioRutaAccion').modal('hide');
        $('#modalRemoverConfirmacionRutaAccion').modal('hide');
        this.mensaje = '';
        this.rutaAccionCreadaActualizada = null;
        this.rutasAccionSeleccionada = null;
    }

    abrirModalConfirmacionRemover() {
        this.mensaje = '';
        $('#modalRemoverConfirmacionRutaAccion').modal('show');
    }

    pagination(paginado: ModeloPaginacion<ModeloRutasAcciones>) {
        this.rutasAccionesMostrar = paginado.itemsArray;
    }

    removerRuta() {
        if (!this.authService.auth) return;

        if (!this.rutasAccionSeleccionada) return;

        this.banderaCargando = true;
        this.rutasAccionesService
            .remover(this.rutasAccionSeleccionada)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.mensaje = resp.mensaje;
                        this.rutasAccionSeleccionada = null;
                        this.obtenerListaRutas();
                    } else {
                        this.mensaje = resp.mensaje;
                        this.error = resp.error;
                        this.rutasAccionSeleccionada = null;
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }
}
