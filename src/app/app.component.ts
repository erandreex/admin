import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstilosService } from './Servicios/estilos.service';
import { EstilosGlobalModelo } from './Modelos/ModeloEstilos';
import { AuthService } from './Servicios/auth.service';
import { PreferenciasService } from './Servicios/preferencias.service';
import { ModeloTema } from './Modelos/ModelosPreferencias';
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

    @ViewChild('estilos') estilos!: ElementRef<HTMLDivElement>;

    constructor(
        private estilosService: EstilosService,
        private authService: AuthService,
        private preferenciasService: PreferenciasService
    ) {
        this.authService.validar().subscribe((resp) => {
            if (resp.ok) {
                this.authService.auth = true;

                this.preferenciasService.preferencias().subscribe((resp) => {
                    this.agregarEstilo(resp.respuesta.tema);
                });
            } else {
                this.authService.auth = false;
            }
        });

        this.preferenciasService.cambioPreferenciaObs$.subscribe((resp) => {
            this.agregarEstilo(resp);
        });

        // this.addStyles(this.estilosService.styleLogic);

        // this.subscriptionStyles = this.estilosService.changeStyles$.subscribe((estilos) => {
        //     this.addStyles(estilos);
        // });
    }

    agregarEstilo(preferencias: ModeloTema) {
        Object.entries(preferencias).forEach(([key, value]) => {
            this.estilos.nativeElement.style.setProperty(`--${key}`, `${value}`);
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
