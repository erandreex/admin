import { Component } from '@angular/core';
import { PermisosRolesRutasService } from './permisos-roles-rutas.service';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    ModeloExternoRoles,
    ModeloExternoRuta,
    ModeloExternoRutaCategorias,
    ModeloPermisosRolRuta,
} from './ModeloPermisosRolesRutas';
import { ModeloError } from 'src/app/Modelos/ModeloError';
import { delay } from 'rxjs';
import { ModeloPaginacion } from 'src/app/Componentes/pagination/ModeloPaginacion';
declare let $: any;

@Component({
    selector: 'app-permisos-roles-rutas',
    templateUrl: './permisos-roles-rutas.component.html',
    styleUrls: ['./permisos-roles-rutas.component.css'],
})
export class PermisosRolesRutasComponent {
    public mensaje: string = '';
    public banderaCargando: boolean = false;
    public permisosRolesRutas: ModeloPermisosRolRuta[] = [];
    public permisosRolesRutasMostrar: ModeloPermisosRolRuta[] = [];

    public permisoRolRutaSeleccionado!: ModeloPermisosRolRuta | null;
    public permisoRolRutaCreada!: ModeloPermisosRolRuta | null;

    public listaRutasCategoriaSeleccionada: string = '';
    public listaRutasCategorias: ModeloExternoRutaCategorias[] = [];
    public listaRutas: ModeloExternoRuta[] = [];
    public listaRutasMostrar: ModeloExternoRuta[] = [];
    public listaRol: ModeloExternoRoles[] = [];

    public error!: ModeloError | null;

    public formularioPermisoRolRuta: FormGroup = this.fb.group({
        id: ['id'],
        rol_id: ['rol_id', Validators.required],
        ruta_id: ['ruta_id', Validators.required],
    });

    constructor(
        private authService: AuthService,
        private permisosRolesRutasService: PermisosRolesRutasService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.obtenerListaPermisos();
    }

    obtenerListaPermisos() {
        if (!this.authService.auth) return;

        this.permisosRolesRutasService.listar().subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.permisosRolesRutas = resp.respuesta['permisos-roles-rutas'];
                    this.listaRutasCategorias = resp.respuesta['rutas-categorias'];
                    this.listaRutas = resp.respuesta.rutas;
                    this.listaRol = resp.respuesta.roles;
                } else {
                    this.error = resp.error;
                    console.log('Error: ', resp);
                }
            },
            error: (err) => console.log('Error: ', err),
            complete() {},
        });
    }

    campoNoesValido(campo: string) {
        return (
            this.formularioPermisoRolRuta.controls[campo].errors &&
            this.formularioPermisoRolRuta.controls[campo].touched
        );
    }

    guardarNuevoPermiso() {
        if (!this.authService.auth) return;

        if (this.formularioPermisoRolRuta.invalid) {
            this.formularioPermisoRolRuta.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.permisosRolesRutasService
            .agregar(this.formularioPermisoRolRuta.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.permisoRolRutaCreada = resp.respuesta['permiso-rol-ruta'];
                        this.mensaje = resp.mensaje;
                        this.obtenerListaPermisos();
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

    btnGuardar() {
        if (!this.authService.auth) return;

        if (this.formularioPermisoRolRuta.invalid) {
            this.formularioPermisoRolRuta.markAllAsTouched();
            return;
        }

        this.guardarNuevoPermiso();
    }

    removerRuta() {
        if (!this.authService.auth) return;

        this.formularioPermisoRolRuta.patchValue({ ...this.permisoRolRutaSeleccionado });

        this.banderaCargando = true;
        this.permisosRolesRutasService
            .remover(this.formularioPermisoRolRuta.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.mensaje = resp.mensaje;
                        this.permisoRolRutaSeleccionado = null;
                        this.obtenerListaPermisos();
                    } else {
                        this.mensaje = resp.mensaje;
                        this.error = resp.error;
                        this.permisoRolRutaSeleccionado = null;
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    pagination(paginado: ModeloPaginacion<ModeloPermisosRolRuta>) {
        this.permisosRolesRutasMostrar = paginado.itemsArray;
    }

    abrirModalConfirmacionRemover() {
        this.mensaje = '';
        $('#modalRemoverConfirmacionRutas').modal('show');
    }

    abrirModalFormulario() {
        this.permisoRolRutaCreada = null;
        this.permisoRolRutaSeleccionado = null;
        this.formularioPermisoRolRuta.reset();
        this.mensaje = '';
        $('#modalFormularuioRuta').modal('show');
    }

    cerrarModal(): void {
        $('#modalFormularuioRuta').modal('hide');
        $('#modalRemoverConfirmacionRutas').modal('hide');
        this.mensaje = '';
        this.permisoRolRutaCreada = null;
        this.permisoRolRutaSeleccionado = null;
    }

    onListenerChangeCategoria(valor: Event) {
        const { value } = valor.target as HTMLInputElement;
        this.listaRutasCategoriaSeleccionada = value;
        this.listaRutasMostrar = this.listaRutas.filter((e) => e.categoria_id == value);
    }
}
