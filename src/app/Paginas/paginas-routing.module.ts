import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RutasComponent } from './rutas/rutas.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RutasCategoriasComponent } from './rutas-categorias/rutas-categorias.component';
import { UsuariosRolesComponent } from './usuarios-roles/usuarios-roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RutasAccionesComponent } from './rutas-acciones/rutas-acciones.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: { hola: 'que hace' },
        children: [
            {
                path: 'administracion/rutas',
                component: RutasComponent,
            },
            {
                path: 'administracion/rutas-categorias',
                component: RutasCategoriasComponent,
            },
            {
                path: 'administracion/rutas-acciones',
                component: RutasAccionesComponent,
            },
            {
                path: 'administracion/usuarios-roles',
                component: UsuariosRolesComponent,
            },
            {
                path: 'administracion/usuarios',
                component: UsuariosComponent,
            },

            {
                path: '**',
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaginasRoutingModule {}
