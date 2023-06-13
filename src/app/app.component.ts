import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstilosService } from './Servicios/estilos.service';
import { EstilosGlobalModelo } from './Modelos/ModeloEstilos';
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Admin';

    public styles: string[] = [];

    public sidebarExpand: boolean = true;

    private subscriptionStyles!: Subscription;

    constructor(private estilosService: EstilosService) {
        this.addStyles(this.estilosService.styleLogic);

        this.subscriptionStyles = this.estilosService.changeStyles$.subscribe((estilos) => {
            this.addStyles(estilos);
        });
    }

    addStyles(estilos: EstilosGlobalModelo) {
        this.styles = Object.values(estilos);
    }

    ngOnDestroy(): void {
        this.subscriptionStyles.unsubscribe();
    }

    pintar() {
        console.log('Renderizado app');
        return true;
    }
}
