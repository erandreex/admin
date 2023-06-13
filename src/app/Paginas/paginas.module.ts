import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { IndexComponent } from './index/index.component';
import { RutasComponent } from './rutas/rutas.component';
import { ComponentesModule } from '../Componentes/componentes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { RutasCategoriasComponent } from './rutas-categorias/rutas-categorias.component';
import { UsuariosRolesComponent } from './usuarios-roles/usuarios-roles.component';

@NgModule({
    declarations: [IndexComponent, RutasComponent, NotFoundComponent, RutasCategoriasComponent, UsuariosRolesComponent],
    imports: [CommonModule, PaginasRoutingModule, ComponentesModule, ReactiveFormsModule],
})
export class PaginasModule {}
