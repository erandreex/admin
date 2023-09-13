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
    configGraficaCantRegistros: number = 30;
    configGraficaTipoRegistros: string = '';
    configGraficaLabelY: string = '';
    configGraficaStacked: boolean = false;
    configGraficaBackground: string = '';
    configGraficaMaxTickLimit: number = 4;
    configGraficaMaxSuggested: number = 1;
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

            if (this.myChartOriginal == null) {
                this.DibujaGrafica().subscribe((resp) => {
                    this.setiarGraficaConfig();
                });
            }

            this.actualizaInfoGrafica();
        });
    }

    setiarGraficaConfig() {
        this.configGraficaNombre = this.graficaConfig.nombre;
        this.configGraficaTitulo = this.graficaConfig.titulo;
        this.configGraficaCantRegistros = this.graficaConfig.cant_registros;
        this.configGraficaTipoRegistros = this.graficaConfig.tipo_registros;
        this.configGraficaLabelY = this.graficaConfig.label_y;
        this.configGraficaStacked = this.graficaConfig.stacked == 'true';
        this.configGraficaBackground = this.graficaConfig.background;
        this.configGraficaMaxTickLimit = this.graficaConfig.max_tick_limit;
        this.configGraficaMaxSuggested = this.graficaConfig.max_suggested;
        this.actualizaInfoGrafica();
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
                    type: this.listaGraficaDatasetsConfig[i].tipoSecundario,
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
            type: 'line',
            options: {
                interaction: {
                    mode: 'index',
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
                        stacked: this.configGraficaStacked,
                        // offset: true,
                        ticks: {
                            font: {
                                size: 12,
                            },
                            // includeBounds: true,
                            color: 'white',
                            sampleSize: 3,
                            // callback: (value, index, values) => {
                            //     if (this.configGraficaTipoRegistros.includes('hh')) {
                            //         let hora1 = momentoDibuja.add(value).get('hours');
                            //         console.log(hora1);
                            //         let hora2 = Number(hora1) + 1;
                            //         return `${hora1}-${hora2}`;
                            //     }
                            //     if (this.configGraficaTipoRegistros.includes('dd')) {
                            //         let fecha = momentoDibuja.add(value).format('MM-DD');
                            //         return fecha;
                            //     }

                            //     let hora = momentoDibuja.add(value).get('hours');
                            //     let minuto = momentoDibuja.add(value).get('minutes');
                            //     let horaFinal: string = '';
                            //     let minutoFinal: string = '';

                            //     if (hora < 10) {
                            //         horaFinal = `0${hora}`;
                            //     } else {
                            //         horaFinal = `${hora}`;
                            //     }

                            //     if (minuto < 10) {
                            //         minutoFinal = `0${minutoFinal}`;
                            //     } else {
                            //         minutoFinal = `${minutoFinal}`;
                            //     }
                            //     return `${horaFinal}:${minutoFinal}`;
                            // },
                            callback: (value, index, values) => {
                                console.log(value);
                                console.log(index);
                                console.log(values);

                                if (this.configGraficaTipoRegistros.includes('hh')) {
                                    let hora1 = format(+value, 'hh');
                                    console.log(hora1);
                                    let hora2 = Number(hora1) + 1;
                                    return `${hora1}-${hora2}`;
                                }
                                if (this.configGraficaTipoRegistros.includes('dd')) {
                                    let fecha = format(+value, 'MM-DD');
                                    return fecha;
                                }

                                let hora = format(+value, 'hh');
                                let minuto = format(+value, 'mm');

                                return `${hora}:${minuto}`;
                            },
                        },
                    },
                    y: {
                        stacked: this.configGraficaStacked,
                        suggestedMax: this.configGraficaMaxSuggested,
                        max: 100,
                        ticks: {
                            font: {
                                size: 12,
                            },
                            // includeBounds: true,
                            color: 'white',
                            sampleSize: 3,
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

// [
//     {
//         stacked: this.configStacked,
//         scaleLabel: {
//             display: true,
//             labelString: this.configLabely,
//             fontColor: '#FFF',
//             fontSize: fontSize,
//         },
//         ticks: {
//             callback: (value: any) => {
//                 return value.toFixed(this.configCantidadDecimales);
//             },
//             min: this.configValorMinimo,
//             fontColor: 'white',
//             fontSize: fontSize,
//             maxTicksLimit: this.configMaxTickLimit,
//             suggestedMax: this.configSuggestedMax,
//         },
//     },
// ],
