import { Component, OnInit } from '@angular/core';
import { RutasService } from './rutas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Servicios/auth.service';
import { ModeloPaginacion } from 'src/app/Componentes/pagination/ModeloPaginacion';
import { Ruta, RutasCategorias, RutaDetalles } from './ModeloRutas';
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

    public rutasCategorias: RutasCategorias[] = [];

    public rutaSeleccionada!: Ruta | null;
    public rutaCreadaActualizada!: RutaDetalles | null;

    public error!: ModeloError | null;

    public banderaCrear: boolean = true;

    public formularioRutas: FormGroup = this.fb.group({
        id: ['id'],
        titulo: ['titulo', Validators.required],
        orden: ['0', Validators.required],
        ruta: ['ruta', Validators.required],
        icono: ['icono', Validators.required],
        color_1: ['color_1', Validators.required],
        color_2: ['color_2', Validators.required],
        componente: ['componente', Validators.required],
        categoria_id: ['fk_categoria', Validators.required],
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
                    this.rutasCategorias = resp.respuesta.categorias;
                } else {
                    console.log('Error: ', resp);
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
                        this.rutaCreadaActualizada = resp.respuesta.ruta;
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

    btnGuardarActualizar() {
        if (!this.authService.auth) return;

        if (this.formularioRutas.invalid) {
            this.formularioRutas.markAllAsTouched();
            return;
        }

        if (this.banderaCrear) {
            this.guardarNuevoUsuario();
        } else {
            this.actualizarUsuario();
        }
    }

    actualizarUsuario() {
        if (!this.authService.auth) return;

        if (this.formularioRutas.invalid) {
            this.formularioRutas.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.rutasService
            .actualizar(this.formularioRutas.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rutaCreadaActualizada = resp.respuesta.ruta;
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

    removerRuta() {
        if (!this.authService.auth) return;
        if (!this.rutaSeleccionada) return;

        let id: string = this.rutaSeleccionada!.id;

        this.banderaCargando = true;
        this.rutasService
            .remover(this.rutaSeleccionada)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.mensaje = resp.mensaje;
                        this.rutaSeleccionada = null;
                        this.obtenerListaRutas();
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

    abrirModalConfirmacionRemover() {
        this.mensaje = '';
        $('#modalRemoverConfirmacionRutas').modal('show');
    }

    abrirModalFormulario() {
        this.rutaCreadaActualizada = null;

        if (this.banderaCrear) {
            this.rutaSeleccionada = null;
            this.formularioRutas.reset();
        } else {
            this.formularioRutas.patchValue(this.rutaSeleccionada!);
        }
        this.mensaje = '';

        $('#modalFormularuioRuta').modal('show');
    }

    cerrarModal(): void {
        $('#modalFormularuioRuta').modal('hide');
        $('#modalRemoverConfirmacionRutas').modal('hide');
        this.mensaje = '';
        this.rutaCreadaActualizada = null;
        this.rutaSeleccionada = null;
    }
}
