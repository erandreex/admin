import { Component } from '@angular/core';
import { RutasCategoriasService } from './rutas-categorias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Servicios/auth.service';
import { ModeloRutaCategoria } from './ModeloRutaCategoria';
import { delay } from 'rxjs';
import { ModeloPaginacion } from 'src/app/Componentes/pagination/ModeloPaginacion';
import { ModeloError } from 'src/app/Modelos/ModeloError';
declare var $: any;

@Component({
    selector: 'app-rutas-categorias',
    templateUrl: './rutas-categorias.component.html',
    styleUrls: ['./rutas-categorias.component.css'],
})
export class RutasCategoriasComponent {
    public rutasCategorias: ModeloRutaCategoria[] = [];
    public rutasCategoriasMostrar: ModeloRutaCategoria[] = [];
    public rutaCategoriaSeleccionada: ModeloRutaCategoria | undefined;
    public rutaCategoriaCreadaActualizada: ModeloRutaCategoria | undefined;

    public mensaje: string = '';
    public error!: ModeloError;

    public banderaCargando: boolean = false;
    public banderaCrear: boolean = true;

    public formularioRutaCategorias: FormGroup = this.fb.group({
        id: [''],
        titulo: ['titulo', Validators.required],
        ruta: ['titulo', Validators.required],
        icono: ['icono', Validators.required],
        color_1: ['color_1', Validators.required],
        color_2: ['color_2', Validators.required],
        orden: [0, Validators.required],
    });

    constructor(
        private authService: AuthService,
        private rutasCategoriasService: RutasCategoriasService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.obtenerRutasCategorias();
    }

    obtenerRutasCategorias() {
        if (!this.authService.auth) return;

        this.rutasCategoriasService.listar().subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.rutasCategorias = resp.respuesta.rutas_categorias;
                } else {
                    console.log('Error', resp);
                }
            },
            error: (err) => console.log('Error: ', err),
            complete() {},
        });
    }

    guardarRutaCategoria() {
        if (!this.authService.auth) return;

        this.banderaCargando = true;
        this.rutasCategoriasService
            .crear(this.formularioRutaCategorias.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaCategoriaCreadaActualizada = resp.respuesta.ruta_categoria;
                        this.mensaje = resp.mensaje;
                        this.obtenerRutasCategorias();
                    } else {
                        this.error = resp.error;
                        console.log('Error', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    campoNoesValido(campo: string) {
        return (
            this.formularioRutaCategorias.controls[campo].errors &&
            this.formularioRutaCategorias.controls[campo].touched
        );
    }

    btnGuardarActualizar() {
        if (!this.authService.auth) return;

        if (this.formularioRutaCategorias.invalid) {
            this.formularioRutaCategorias.markAllAsTouched();
            return;
        }

        if (this.banderaCrear) {
            this.guardarRutaCategoria();
        } else {
            this.actualizarRutaCategoria();
        }
    }

    actualizarRutaCategoria() {
        if (!this.authService.auth) return;

        this.banderaCargando = true;
        this.rutasCategoriasService
            .actualizar(this.formularioRutaCategorias.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaCategoriaCreadaActualizada = resp.respuesta.ruta_categoria;
                        this.mensaje = resp.mensaje;
                        this.obtenerRutasCategorias();
                    } else {
                        this.mensaje = resp.mensaje;
                        this.error = resp.error;
                        console.log('Error', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    removerRutaCategoria() {
        if (!this.authService.auth) return;

        this.banderaCargando = true;
        this.rutasCategoriasService
            .remover(this.rutaCategoriaSeleccionada!)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaCategoriaCreadaActualizada = resp.respuesta.ruta_categoria;
                        this.mensaje = resp.mensaje;
                        this.obtenerRutasCategorias();
                    } else {
                        this.mensaje = resp.mensaje;
                        this.error = resp.error;
                        console.log('Error', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    pagination(paginado: ModeloPaginacion<ModeloRutaCategoria>) {
        this.rutasCategoriasMostrar = paginado.itemsArray;
    }

    abrirModalFormulario() {
        this.rutaCategoriaCreadaActualizada = undefined;

        if (this.banderaCrear) {
            this.rutaCategoriaSeleccionada = undefined;
            this.formularioRutaCategorias.reset();
        } else {
            this.formularioRutaCategorias.patchValue(this.rutaCategoriaSeleccionada!);
        }
        this.mensaje = '';

        $('#modalRutasCategorias').modal('show');
    }

    abrirModalConfirmacionRemover() {
        $('#modalRemoverConfirmacionRutasCategorias').modal('show');
        this.mensaje = '';
    }

    cerrarModal(): void {
        $('#modalRutasCategorias').modal('hide');
        $('#modalRemoverConfirmacionRutasCategorias').modal('hide');

        this.rutaCategoriaSeleccionada = undefined;
        this.mensaje = '';
        this.obtenerRutasCategorias();
    }
}
