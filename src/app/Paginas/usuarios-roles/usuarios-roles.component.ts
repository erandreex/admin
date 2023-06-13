import { Component } from '@angular/core';
import { UsuariosRolesService } from './usuarios-roles.service';
import { ModeloRol } from 'src/app/Modelos/ModeloRol';

@Component({
    selector: 'app-usuarios-roles',
    templateUrl: './usuarios-roles.component.html',
    styleUrls: ['./usuarios-roles.component.css'],
})
export class UsuariosRolesComponent {
    constructor(private usuariosRolesService: UsuariosRolesService) {}

    public roles: ModeloRol[] = [];

    ngOnInit(): void {
        this.usuariosRolesService.listar().subscribe((resp) => {
            this.roles = resp.respuesta.roles;
        });
    }
}
