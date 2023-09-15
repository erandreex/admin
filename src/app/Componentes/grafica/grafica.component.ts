import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, of } from 'rxjs';

import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';

// import 'moment/locale/es'; // Importa la localización que desees, en este caso, español
import {
    ModeloDataGraficaFinal,
    ModeloGraficaConfig,
    ModeloGraficaConsulta,
    ModeloGraficaDatasetConfig,
    ModeloGraficaDatasetData,
} from './ModeloGrafica';
import { GraficaService } from './grafica.service';

declare var $: any;

@Component({
    selector: 'app-grafica',
    templateUrl: './grafica.component.html',
    styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent implements OnInit, OnDestroy {
    // VARIABLES GENERALES GRAFICA
    @Input('nombre') public nombre: string = '';
    myChartOriginal: any = null;
    listaLabelsGrafica: string[] = [];
    public chart: any;
    miObservableConsDatos: any = null;
    // VARIABLES GENERALES GRAFICA

    // VARIABLES GRAFICA CONFIG
    configGraficaNombre: string = '';
    configGraficaTitulo: string = '';
    configGraficaCantRegistros: number = 15;
    configGraficaIntervaloOperacion: string = '';
    configGraficaIntervaloTiempo:
        | 'millisecond'
        | 'second'
        | 'minute'
        | 'hour'
        | 'day'
        | 'week'
        | 'month'
        | 'quarter'
        | 'year' = 'minute';
    configGraficaIntervaloValor: string = '';
    configY_label: string = '';
    configY_color: string = '';
    configY_sugg_max: number = 11;
    configY_sugg_min: number = 11;
    configY_begintAtZero: boolean = false;
    configY_tick_limit: number = 10;
    configX_color: string = '';
    configX_tick_limit: number = 15;
    configGraficaStacked: boolean = false;
    configGraficaBackground: string = '';
    configGraficaObservable: number = 60000;
    // VARIABLES GRAFICA CONFIG

    // VARIABLES ARREGLOS

    public listaGraficaDatasetsConfig: ModeloGraficaDatasetConfig[] = [];
    public listaGraficaDatasetsData: ModeloGraficaDatasetData[] = [];
    public graficaConfig!: ModeloGraficaConfig;
    public listaGraficaLabels: string[] = [];

    // VARIABLES ARREGLOS

    constructor(private graficaService: GraficaService) {}

    ngOnInit(): void {
        this.obtenerDatosGrafica();

        this.miObservableConsDatos = interval(60000).subscribe((resp) => {
            this.obtenerDatosGrafica();
        });
    }

    ngOnDestroy(): void {
        if (this.myChartOriginal) {
            this.myChartOriginal.clear();
            this.myChartOriginal.destroy();
        }
        if (this.miObservableConsDatos) this.miObservableConsDatos.unsubscribe();
    }

    obtenerDatosGrafica() {
        let numero: string = '1';

        switch (this.nombre) {
            case 'grafica1':
                numero = '1';
                break;
            case 'grafica2':
                numero = '2';
                break;
            case 'grafica3':
                numero = '3';
                break;
            case 'grafica4':
                numero = '4';
                break;
            case 'grafica5':
                numero = '5';
                break;
            case 'grafica6':
                numero = '6';
                break;
            case 'grafica7':
                numero = '7';
                break;
            case 'grafica8':
                numero = '8';
                break;
            case 'grafica9':
                numero = '9';
                break;
            default:
                break;
        }

        let body: ModeloGraficaConsulta = {
            idGrafica: numero,
            cantRegistros: 30,
            consultaFecha: 'N/A',
        };

        this.graficaService.consultaGrafica(body).subscribe((resp) => {
            this.listaGraficaDatasetsData = resp.respuesta.datasetsData;
            this.listaGraficaDatasetsConfig = resp.respuesta.datasetsConfig;
            this.graficaConfig = resp.respuesta.graficaConfig;
            this.listaGraficaLabels = resp.respuesta.datasetsLabels;

            this.configGraficaNombre = this.graficaConfig.nombre;
            this.configGraficaTitulo = this.graficaConfig.titulo;
            this.configGraficaCantRegistros = this.graficaConfig.cant_registros;
            this.configGraficaIntervaloOperacion = this.graficaConfig.intervalo_operacion;
            this.configGraficaIntervaloTiempo = this.graficaConfig.intervalo_tiempo;
            this.configGraficaIntervaloValor = this.graficaConfig.intervalo_valor;
            this.configY_label = this.graficaConfig.y_label;
            this.configY_color = this.graficaConfig.y_color;
            this.configY_sugg_max = this.graficaConfig.y_sugg_max;
            this.configY_sugg_min = this.graficaConfig.y_sugg_min;
            this.configY_begintAtZero = this.graficaConfig.y_beginAtZero == 'true';
            this.configY_tick_limit = this.graficaConfig.y_tick_limit;
            this.configGraficaStacked = this.graficaConfig.stacked == 'true';
            this.configGraficaBackground = this.graficaConfig.background;
            this.configGraficaObservable = this.graficaConfig.observable;
            this.configX_color = this.graficaConfig.x_color;
            this.configX_tick_limit = this.graficaConfig.x_tick_limit;

            if (this.myChartOriginal == null) {
                this.DibujaGrafica().subscribe((resp) => {
                    this.actualizaInfoGrafica();
                });
            }

            this.actualizaInfoGrafica();
        });
    }

    obtenerDatasetData(indice: number) {
        let temporal: ModeloGraficaDatasetData[] = [];
        temporal = this.listaGraficaDatasetsData.filter((e) => e.dataPosicion == indice);
        return temporal.map((e) => e.dataCantidad);
    }

    actualizaInfoGrafica() {
        let temporal: any[] = [];
        if (this.myChartOriginal) {
            this.myChartOriginal.config.data.datasets.length = 0;
            this.myChartOriginal.data.labels = this.listaGraficaLabels;

            for (let i = 0; i < this.listaGraficaDatasetsConfig.length; i++) {
                let newDataset: any = {
                    data: this.obtenerDatasetData(this.listaGraficaDatasetsConfig[i].dataset_posicion),
                    label: this.listaGraficaDatasetsConfig[i].dataset_label,
                    pointHoverBackgroundColor: this.listaGraficaDatasetsConfig[i].punto_color_hover,
                    pointRadius: this.listaGraficaDatasetsConfig[i].punto_tamano,
                    fill: this.listaGraficaDatasetsConfig[i].fill == 'true',
                    type: this.listaGraficaDatasetsConfig[i].tipo,
                    borderWidth: this.listaGraficaDatasetsConfig[i].borde_tamano,
                    stack: this.listaGraficaDatasetsConfig[i].stack,
                    borderColor: this.listaGraficaDatasetsConfig[i].borde_color,
                    backgroundColor: this.listaGraficaDatasetsConfig[i].fondo_color,
                    tension: 0.3,
                    hoverRadius: 1.2,
                    // pointStyle: false,
                };
                temporal.push(newDataset);
            }

            this.myChartOriginal.data.datasets.push(...temporal);
            this.myChartOriginal.data.labels = this.listaGraficaLabels;
        }
        this.myChartOriginal.update();
    }

    DibujaGrafica(): Observable<boolean> {
        let canvas = <HTMLCanvasElement>document.getElementById(this.nombre);

        let ctx = canvas.getContext('2d');
        let boxSize: number = 40;
        let fontSize: number = 12;

        if (screen.height < 700) {
            boxSize = 5;
            fontSize = 8;
        }

        let canvasContainer = <HTMLElement>document.getElementById('containerGrafica');
        let tituloFinal: string = this.configGraficaTitulo;
        let valorFinal = '100vh';

        if (canvasContainer) valorFinal = `${canvasContainer.clientHeight}px`;

        canvas.style.width = 'auto';
        canvas.style.height = valorFinal;

        let chartTemporal = new Chart(ctx!, {
            plugins: [
                {
                    id: 'background',
                    beforeDraw: (chart, args, options) => {
                        const { ctx } = chart;
                        ctx.save();
                        ctx.fillStyle = '#292E38';
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    },
                },
            ],
            type: this.graficaConfig.tipo_principal,
            options: {
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#FFF',
                            boxWidth: boxSize,
                            font: {
                                size: fontSize,
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: tituloFinal,
                        color: '#FFF',
                        font: {
                            size: fontSize,
                        },
                    },
                    tooltip: {
                        mode: 'index',
                        yAlign: 'center',
                        bodyFont: {
                            size: fontSize,
                        },
                        titleFont: {
                            size: fontSize,
                        },
                        footerFont: {
                            size: fontSize,
                        },
                    },
                },
                layout: {
                    padding: 20,
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: this.configGraficaIntervaloTiempo,
                        },
                        stacked: this.configGraficaStacked,
                        ticks: {
                            font: {
                                size: 12,
                            },
                            color: 'white',
                            source: 'data',
                            // maxRotation: 10,
                            // minRotation: 5,
                        },
                    },
                    y: {
                        suggestedMax: this.configY_sugg_max,
                        suggestedMin: this.configY_sugg_min,
                        beginAtZero: this.configY_begintAtZero,
                        stacked: this.configGraficaStacked,

                        ticks: {
                            font: {
                                size: 12,
                            },
                            color: this.configY_color,
                            maxTicksLimit: this.configY_tick_limit,
                        },
                        title: {
                            display: true,
                            color: this.configY_color,
                            text: this.configY_label,
                        },
                    },
                },
            },
            data: {
                labels: [],
                datasets: [],
            },
        });

        this.myChartOriginal = chartTemporal;

        return of(true);
    }
}
