import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarSelectionDirective } from './Directivas/sidebar-selection.directive';

@NgModule({
    declarations: [SidebarSelectionDirective],
    imports: [CommonModule],
    exports: [SidebarSelectionDirective],
})
export class UtilidadesModule {}
