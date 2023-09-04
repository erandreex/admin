import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { ConfigGrafica } from './ModeloGrafica';
import { Observable, of } from 'rxjs';

declare var $: any;

@Component({
    selector: 'app-grafica',
    templateUrl: './grafica.component.html',
    styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent {
    myChartOriginal: any = null;
    listaLabelsGrafica: string[] = [];
    public chart: any;

    @Input() listaConfigGraficas: ConfigGrafica[] = [];

    // Variables
    configTipoRegistros: string = '';
    configTipoPrincipal: string = '';
    configTitulo: string = '';
    configLabely: string = '';
    configMaxTickLimit: number = 4;
    configSuggestedMax: number = 100;
    configCantidadDecimales: number = 0;
    configValorMinimo: number = 0;
    configStacked: boolean = false;
    configFechaMod: string = '';
    miObservableConsDatos: any = null;
    // Variables

    constructor() {}

    DibujaGrafica(grafica: string): Observable<boolean> {
        let canvas = <HTMLCanvasElement>document.getElementById(grafica);

        let ctx = canvas.getContext('2d');
        let momentoDibuja = moment();
        let tipoLabelFecha = this.configTipoRegistros;
        let boxSize: number = 40;
        let fontSize: number = 12;
        let total: number = 0;

        if (screen.height < 700) {
            boxSize = 5;
            fontSize = 8;
        }

        let canvasContainer = <HTMLElement>document.getElementById('containerGrafica1');
        let tituloFinal: string = this.configTitulo;
        let valorFinal = '27vh';

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
                    mode: 'dataset',
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
                scales: {
                    xAxis: {
                        type: 'time',
                        stacked: this.configStacked,
                        ticks: {
                            font: {
                                size: fontSize,
                            },
                            color: 'white',
                            callback: (value: any) => {
                                if (tipoLabelFecha.includes('hh')) {
                                    let hora1 = momentoDibuja.add(value).get('hours');
                                    let hora2 = Number(hora1) + 1;
                                    return `${hora1}-${hora2}`;
                                }
                                if (tipoLabelFecha.includes('dd')) {
                                    let fecha = momentoDibuja.add(value).format('MM-DD');
                                    return fecha;
                                }

                                let hora = momentoDibuja.add(value).get('hours');
                                let minuto = momentoDibuja.add(value).get('minutes');
                                let horaFinal: string = '';
                                let minutoFinal: string = '';

                                if (hora < 10) {
                                    horaFinal = `0${hora}`;
                                } else {
                                    horaFinal = `${hora}`;
                                }

                                if (minuto < 10) {
                                    minutoFinal = `0${minutoFinal}`;
                                } else {
                                    minutoFinal = `${minutoFinal}`;
                                }
                                return `${horaFinal}:${minutoFinal}`;
                            },
                        },
                    },
                    yAxis: {
                        stacked: this.configStacked,
                        suggestedMax: this.configMaxTickLimit,
                        max: this.configMaxTickLimit,
                        ticks: {
                            callback: (value: any) => {
                                return value.toFixed(this.configCantidadDecimales);
                            },
                            font: {
                                size: fontSize,
                            },
                            color: 'white',
                        },
                    },
                },
            },
            data: {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [1, 2, 3],
                    },
                ],
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
