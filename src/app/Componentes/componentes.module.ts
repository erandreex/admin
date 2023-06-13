import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { UtilidadesModule } from '../Utilidades/utilidades.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
    declarations: [HeaderComponent, SidebarComponent, BreadcrumbComponent],
    imports: [CommonModule, RouterModule, UtilidadesModule],
    exports: [HeaderComponent, SidebarComponent, BreadcrumbComponent],
})
export class ComponentesModule {}
