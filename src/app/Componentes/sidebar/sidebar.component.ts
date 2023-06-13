import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentesService } from '../componentes.service';
import { Ruta, RutaListaHTML, Rutas } from 'src/app/Modelos/ModeloRutas';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    //Entradas
    @Input() public sidebarExpand: boolean = true;

    // Salidas
    @Output() expandToggled = new EventEmitter<boolean>();

    // Variables
    public clase: string = '';
    public rutas: Ruta[] = [];
    public rutasCategorias: Ruta[] = [];

    public rutaListaHTML: RutaListaHTML[] = [];

    public ordenCategorias: number[] = [];

    constructor(private componentesService: ComponentesService) {}

    ngOnInit(): void {
        this.componentesService.obtenerRutas().subscribe({
            next: (val) => {
                if (val.ok) {
                    this.rutas = val.respuesta.rutas;
                    this.ordenarLista();
                } else {
                    console.log('Error');
                }
            },
            error: (err) => console.log('errr', err),
            complete() {},
        });
    }

    ordenarLista() {
        let categoriasId: string[] = [];
        categoriasId = this.rutas.map((e) => e.ruta_categoria);
        const dataArr = new Set(categoriasId);
        categoriasId = [...dataArr];

        categoriasId.forEach((id) => {
            let temporal: Ruta | undefined;
            temporal = this.rutas.find((e) => e.categoria_id == id);
            this.ordenCategorias.push(temporal!.categoria_orden);
        });

        this.ordenCategorias = this.ordenCategorias.sort();
        let temporalRutas: Ruta[] = [];
        let temporalRutasOrdenadas: Ruta[] = [];
        let temporalCategoria: Ruta | undefined;

        this.ordenCategorias.forEach((orden) => {
            let temporalLongitudRutas: number = 0;
            let contador: number = 1;
            temporalRutas = this.rutas.filter((e) => e.categoria_orden == orden);
            temporalCategoria = this.rutas.find((e) => e.categoria_orden == orden);
            temporalLongitudRutas = temporalRutas.length;
            temporalRutasOrdenadas = [];

            temporalRutas.forEach((e) => {
                contador = contador + 1;

                console.log(e.ruta_orden);
                if (temporalRutasOrdenadas[e.ruta_orden]) {
                    temporalRutasOrdenadas[temporalLongitudRutas + contador] = e;
                } else {
                    temporalRutasOrdenadas[e.ruta_orden] = e;
                }
            });

            temporalRutasOrdenadas = temporalRutasOrdenadas.filter(Boolean);

            let temporal123: RutaListaHTML = {
                categoria_id: temporalCategoria!.categoria_id,
                categoria_orden: temporalCategoria!.categoria_orden,
                categoria_titulo: temporalCategoria!.categoria_titulo,
                categoria_ruta: temporalCategoria!.categoria_ruta,
                categoria_icono: temporalCategoria!.categoria_icono,
                categoria_color_1: temporalCategoria!.categoria_color_1,
                categoria_color_2: temporalCategoria!.categoria_color_2,
                rutas: temporalRutasOrdenadas,
            };

            this.rutaListaHTML.push(temporal123);
        });
    }

    toggleExpandSidebar() {
        if (this.sidebarExpand) {
            this.clase = 'toggled';
            this.sidebarExpand = false;
        } else {
            this.clase = '';
            this.sidebarExpand = true;
        }
        this.expandToggled.emit(this.sidebarExpand);
    }

    // Expandir solo cuando el sidebarExpand es false;
    expandOnlyExpandisFalse() {
        if (this.sidebarExpand) return;
        this.clase = '';
    }

    // Reducir solo cuando el sidebarExpand es false;
    reduceOnlyExpandisFalse() {
        if (this.sidebarExpand) return;
        this.clase = 'toggled';
    }
}
