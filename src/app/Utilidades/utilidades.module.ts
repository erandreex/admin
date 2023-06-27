import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarSelectionDirective } from './Directivas/sidebar-selection.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpIntercept } from './Interceptores/http.interceptor';
import { ModalsService } from '../Componentes/modals/modals.service';

@NgModule({
    declarations: [SidebarSelectionDirective],
    imports: [CommonModule, HttpClientModule],
    providers: [
        // ModalsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpIntercept,
            multi: true,
        },
    ],
    exports: [SidebarSelectionDirective],
})
export class UtilidadesModule {}
