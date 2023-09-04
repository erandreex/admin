import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { UtilidadesModule } from '../Utilidades/utilidades.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ModalsComponent } from './modals/modals.component';
import { PaginationComponent } from './pagination/pagination.component';
import { GraficaComponent } from './grafica/grafica.component';

@NgModule({
    declarations: [HeaderComponent, SidebarComponent, BreadcrumbComponent, ModalsComponent, PaginationComponent, GraficaComponent],
    imports: [CommonModule, RouterModule, UtilidadesModule],
    exports: [HeaderComponent, SidebarComponent, BreadcrumbComponent, ModalsComponent, PaginationComponent],
})
export class ComponentesModule {}
