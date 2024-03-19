import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardBaseService } from './dashboard-base.service';
import {
    ModeloComponenteCuadricula,
    ModeloComponentePropiedades,
    ModeloConfiguracionComponente,
} from './ModeloDashboard';

@Component({
    selector: 'app-dashboard-base',
    templateUrl: './dashboard-base.component.html',
    styleUrls: ['./dashboard-base.component.css'],
})
export class DashboardBaseComponent implements OnInit, AfterViewInit {
    // VARIABLES PARAMETROS GENERAL
    public parametro_grafica_height: string = '325';
    public parametro_tamano_small: number = 400;
    public parametro_tamano_mediun: number = 800;
    public parametro_tamano_large: number = 1200;
    public parametro_tamano_xlarge: number = 1500;
    // VARIABLES PARAMETROS GENERAL

    // VARIABLES CALCULOS
    public calculo_tamano: 'small' | 'medium' | 'large' | 'xlarge' = 'small';
    // VARIABLES CALCULOS

    public nombre: string = '';
    public listaComponenteCuadricula: ModeloComponenteCuadricula[] = [];
    public listaEnvioComponente: ModeloConfiguracionComponente[] = [];

    @ViewChild('layout') layout!: ElementRef<HTMLDivElement>;

    constructor(private route: ActivatedRoute, private dashboardBaseService: DashboardBaseService) {}

    ngOnInit() {
        this.nombre = this.route.snapshot.paramMap.get('nombre') || 'sinnombre';
    }

    ngAfterViewInit() {
        this.obtenerComponentes();
    }

    obtenerComponentes() {
        this.dashboardBaseService.consultaGrafica(this.nombre).subscribe((resp) => {
            this.listaComponenteCuadricula = resp.respuesta.cuadricula;
            this.parametro_grafica_height = resp.respuesta.parametros.grafica_height;
            this.parametro_tamano_small = +resp.respuesta.parametros.tamano_small;
            this.parametro_tamano_mediun = +resp.respuesta.parametros.tamano_mediun;
            this.parametro_tamano_large = +resp.respuesta.parametros.tamano_large;
            this.parametro_tamano_xlarge = +resp.respuesta.parametros.tamano_xlarge;

            this.calculosPrincipales();
        });
    }

    calculosPrincipales() {
        let valorWidthContendor: number = this.layout.nativeElement.offsetWidth;
        let columnasTotal: number = 12;
        let valorColumna: number = valorWidthContendor / columnasTotal;
        let temporal: ModeloConfiguracionComponente[] = [];
        let temporal2: ModeloComponentePropiedades;

        let anchoNumero: number = 0;
        let anchoCalculo: number = 0;
        let anchoSpan: number = 0;
        let altoNumero: number = 0;
        let altoCalculo: number = 0;
        let altoSpan: number = 0;

        // Calcular el tipo de tamano
        if (valorWidthContendor > this.parametro_tamano_small) {
            this.calculo_tamano = 'small';
        }
        if (valorWidthContendor > this.parametro_tamano_mediun) {
            this.calculo_tamano = 'medium';
        }
        if (valorWidthContendor > this.parametro_tamano_large) {
            this.calculo_tamano = 'large';
        }
        if (valorWidthContendor > this.parametro_tamano_xlarge) {
            this.calculo_tamano = 'xlarge';
        }
        // Calcular el tipo de tamano

        this.listaComponenteCuadricula.forEach((element) => {
            switch (this.calculo_tamano) {
                case 'small':
                    altoNumero = +element.tamano_small.split('x')[0];
                    anchoNumero = +element.tamano_small.split('x')[1];
                    break;
                case 'medium':
                    altoNumero = +element.tamano_medium.split('x')[0];
                    anchoNumero = +element.tamano_medium.split('x')[1];
                    break;

                case 'large':
                    altoNumero = +element.tamano_large.split('x')[0];
                    anchoNumero = +element.tamano_large.split('x')[1];
                    break;

                case 'xlarge':
                    altoNumero = +element.tamano_xlarge.split('x')[0];
                    anchoNumero = +element.tamano_xlarge.split('x')[1];
                    break;
            }

            anchoCalculo = Math.floor(valorColumna * anchoNumero);
            altoCalculo = Math.floor(+this.parametro_grafica_height * altoNumero);

            temporal2 = {
                propiedad_alto: altoCalculo,
                propiedad_ancho: anchoCalculo,
                span_alto: `span ${altoNumero}`,
                span_ancho: `span ${anchoNumero}`,
            };

            temporal.push({ configuracion: element, propiedades: temporal2 });
        });

        this.listaEnvioComponente = temporal;
    }
}
