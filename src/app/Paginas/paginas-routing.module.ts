import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { IndexComponent } from './index/index.component';
import { InicioComponent } from './inicio/inicio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PermisosRolesRutasComponent } from './permisos-roles-rutas/permisos-roles-rutas.component';
import { routeGuard } from '../Utilidades/Guards/route.guard';
import { RutasAccionesComponent } from './rutas-acciones/rutas-acciones.component';
import { RutasCategoriasComponent } from './rutas-categorias/rutas-categorias.component';
import { RutasComponent } from './rutas/rutas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosRolesComponent } from './usuarios-roles/usuarios-roles.component';
import { DashboardBaseComponent } from './dashboard-base/dashboard-base.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        canActivateChild: [routeGuard],
        children: [
            {
                path: '',
                component: InicioComponent,
            },
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
                path: 'permisos/roles-rutas',
                component: PermisosRolesRutasComponent,
            },
            {
                path: 'dashboard/:nombre',
                component: DashboardBaseComponent,
            },
        ],
    },
    {
        path: '',
        component: IndexComponent,
        children: [
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
