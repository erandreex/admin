import { Component } from '@angular/core';
import { UsuariosRolesService } from './usuarios-roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Servicios/auth.service';
import { delay } from 'rxjs';
import { ModeloRol } from './ModeloRoles';
import { ModeloError } from '../../Modelos/ModeloError';
declare var $: any;

@Component({
    selector: 'app-usuarios-roles',
    templateUrl: './usuarios-roles.component.html',
    styleUrls: ['./usuarios-roles.component.css'],
})
export class UsuariosRolesComponent {
    public roles: ModeloRol[] = [];

    public rol: ModeloRol | undefined;

    public mensaje: string = '';

    public banderaCargando: boolean = false;
    public error!: ModeloError;

    public formularioRoles: FormGroup = this.fb.group({
        id: [''],
        nombre: ['nombre', Validators.required],
    });

    constructor(private authService: AuthService, private usuariosRolesService: UsuariosRolesService, private fb: FormBuilder) {}

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

        this.rol = undefined;
        this.mensaje = '';
        this.obtenerListaUsuariosRoles();
    }

    removerUsuarioRol() {
        if (!this.authService.auth) return;

        this.banderaCargando = true;
        this.usuariosRolesService
            .remover(this.rol!)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.mensaje = resp.mensaje;
                        this.rol = undefined;
                    } else {
                        this.mensaje = resp.error.mensaje;
                        this.error = resp.error;
                        this.rol = undefined;
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    guardarNuevoRol() {
        if (!this.authService.auth) return;

        if (this.formularioRoles.invalid) {
            this.formularioRoles.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.usuariosRolesService
            .crear(this.formularioRoles.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.rol = resp.respuesta.rol;
                        this.mensaje = resp.mensaje;
                    } else {
                        console.log('Error', resp);
                    }
                    this.banderaCargando = false;
                },
                error: (err) => console.log('Error: ', err),
                complete() {},
            });
    }

    campoNoesValido(campo: string) {
        return this.formularioRoles.controls[campo].errors && this.formularioRoles.controls[campo].touched;
    }
}
