import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { ModeloUsuario } from './ModeloUsuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
    constructor(private usuariosService: UsuariosService, private fb: FormBuilder) {}

    public usuarios: ModeloUsuario[] = [];

    public observableLista: any;

    public formularioUsuario: FormGroup = this.fb.group({
        id: ['123'],
        nombre: ['nombre', Validators.required],
        apellido: ['apellido', Validators.required],
        username: ['username', Validators.required],
        password: ['password', Validators.required],
        correo: ['correo', Validators.required],
        rol_id: ['rol_id', Validators.required],
    });

    ngOnInit(): void {
        this.obtenerListaUsuarios();
    }

    obtenerListaUsuarios() {
        this.observableLista = this.usuariosService.listar().subscribe((resp) => {
            this.usuarios = resp.respuesta.usuarios;
        });
    }

    guadar() {
        if (this.formularioUsuario.invalid) {
            this.formularioUsuario.markAllAsTouched();
            return;
        }

        this.usuariosService.registro(this.formularioUsuario.value).subscribe((resp) => {
            console.log(resp);
        });
    }

    campoNoesValido(campo: string) {
        return this.formularioUsuario.controls[campo].errors && this.formularioUsuario.controls[campo].touched;
    }

    ngOnDestroy(): void {
        if (this.observableLista) {
        }
    }
}
