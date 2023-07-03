import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { ModeloUsuario } from './ModeloUsuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Servicios/auth.service';
import { delay } from 'rxjs';
import { ModeloRol } from '../usuarios-roles/ModeloRoles';
import { ModeloPaginacion } from 'src/app/Componentes/pagination/ModeloPaginacion';
declare var $: any;

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
    public usuarios: ModeloUsuario[] = [];
    public usuariosRoles: ModeloRol[] = [];
    public usuariosCreado!: ModeloUsuario | null;

    public usuariosMostrar: ModeloUsuario[] = [];

    public mensaje: string = '';

    public banderaCargando: boolean = false;

    public formularioUsuario: FormGroup = this.fb.group({
        id: ['123'],
        nombre: ['nombre', Validators.required],
        apellido: ['apellido', Validators.required],
        username: ['username', Validators.required],
        password: ['password', Validators.required],
        correo: ['correo', Validators.required],
        rol_id: ['rol_id', Validators.required],
    });

    constructor(private authService: AuthService, private usuariosService: UsuariosService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.obtenerListaUsuariosRoles();
    }

    obtenerListaUsuariosRoles() {
        if (!this.authService.auth) return;

        this.usuariosService.listar().subscribe({
            next: (resp) => {
                if (resp.ok) {
                    this.usuariosRoles = resp.respuesta.roles;
                    this.usuarios = resp.respuesta.usuarios;
                } else {
                    console.log('Error', resp);
                }
            },
            error: (err) => console.log('Error: ', err),
            complete() {},
        });
    }

    guardarNuevoUsuario() {
        if (!this.authService.auth) return;

        if (this.formularioUsuario.invalid) {
            this.formularioUsuario.markAllAsTouched();
            return;
        }

        this.banderaCargando = true;
        this.usuariosService
            .registro(this.formularioUsuario.value)
            .pipe(delay(1000))
            .subscribe({
                next: (resp) => {
                    if (resp.ok) {
                        this.usuariosCreado = resp.respuesta.usuario;
                        this.mensaje = resp.mensaje;
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
        this.usuariosCreado = null;
        this.mensaje = '';
        $('#modalUsuario').modal('show');
    }

    cerrarModal(): void {
        $('#modalUsuario').modal('hide');
        this.obtenerListaUsuariosRoles();
    }

    pagination(paginado: ModeloPaginacion<ModeloUsuario>) {
        this.usuariosMostrar = paginado.itemsArray;
    }

    campoNoesValido(campo: string) {
        return this.formularioUsuario.controls[campo].errors && this.formularioUsuario.controls[campo].touched;
    }
}
