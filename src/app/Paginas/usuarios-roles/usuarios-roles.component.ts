import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';

import { UsuariosRolesService } from './usuarios-roles.service';
import { AuthService } from '../../Servicios/auth.service';
import { ModeloRol } from './ModeloRoles';
import { ModeloError } from 'src/app/Modelos/ModeloError';
import { ModeloPaginacion } from 'src/app/Componentes/pagination/ModeloPaginacion';
declare var $: any;

@Component({
    selector: 'app-usuarios-roles',
    templateUrl: './usuarios-roles.component.html',
    styleUrls: ['./usuarios-roles.component.css'],
})
export class UsuariosRolesComponent {
    public roles: ModeloRol[] = [];
    public rolesMostrar: ModeloRol[] = [];

    public rolSeleccionado: ModeloRol | undefined;
    public rolCreadoActualizado: ModeloRol | undefined;

    public mensaje: string = '';

    public banderaCargando: boolean = false;
    public banderaCrear: boolean = true;

    public error!: ModeloError;

    public formularioRoles: FormGroup = this.fb.group({
        id: [''],
        nombre: ['nombre', Validators.required],
    });

    constructor(
        private authService: AuthService,
        private usuariosRolesService: UsuariosRolesService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.obtenerListaUsuariosRoles();
    }

    obtenerListaUsuariosRoles() {
        if (!this.authService.auth) return;

        this.usuariosRolesService.listar().subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.roles = resp.respuesta.roles;
                } else {
                    console.log('Error', resp);
                }
            },
            error: (err) => console.log('Error: ', err),
            complete() {},
        });
    }

    cerrarModal(): void {
        $('#modalUsuarioRoles').modal('hide');
        $('#modalRemoverConfirmacionUsuarioRoles').modal('hide');

        this.rolCreadoActualizado = undefined;
        this.rolSeleccionado = undefined;
        this.mensaje = '';
    }

    removerUsuarioRol() {
        if (!this.authService.auth) return;

        this.banderaCargando = true;
        this.usuariosRolesService
            .remover(this.rolSeleccionado!)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.mensaje = resp.mensaje;
                        this.rolSeleccionado = undefined;
                        this.obtenerListaUsuariosRoles();
                    } else {
                        this.mensaje = resp.error.mensaje;
                        this.error = resp.error;
                        this.rolSeleccionado = undefined;
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    pagination(paginado: ModeloPaginacion<ModeloRol>) {
        this.rolesMostrar = paginado.itemsArray;
    }

    btnGuardarActualizar() {
        if (!this.authService.auth) return;

        if (this.formularioRoles.invalid) {
            this.formularioRoles.markAllAsTouched();
            return;
        }

        if (this.banderaCrear) {
            this.guardarRol();
        } else {
            this.actualizarRol();
        }
    }

    guardarRol() {
        if (!this.authService.auth) return;

        this.banderaCargando = true;

        this.usuariosRolesService
            .crear(this.formularioRoles.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rolCreadoActualizado = resp.respuesta.rol;
                        this.mensaje = resp.mensaje;
                        this.obtenerListaUsuariosRoles();
                    } else {
                        console.log('Error', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    actualizarRol() {
        if (!this.authService.auth) return;

        this.banderaCargando = true;

        this.usuariosRolesService
            .actualizar(this.formularioRoles.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rolCreadoActualizado = resp.respuesta.rol;
                        this.mensaje = resp.mensaje;
                        this.obtenerListaUsuariosRoles();
                    } else {
                        console.log('Error', resp);
                        this.mensaje = resp.mensaje;
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    abrirModal() {
        if (this.banderaCrear) {
            this.rolSeleccionado = undefined;
            this.formularioRoles.reset();
        } else {
            this.formularioRoles.patchValue(this.rolSeleccionado!);
        }
        this.mensaje = '';
        $('#modalUsuarioRoles').modal('show');
    }

    campoNoesValido(campo: string) {
        return this.formularioRoles.controls[campo].errors && this.formularioRoles.controls[campo].touched;
    }
}
