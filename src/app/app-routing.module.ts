import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Paginas/login/login.component';
import { NotFoundComponent } from './Paginas/not-found/not-found.component';
import { routeGuard } from './Utilidades/Guards/route.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        canActivate: [routeGuard],
        loadChildren: () => import('./Paginas/paginas.module').then((m) => m.PaginasModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}