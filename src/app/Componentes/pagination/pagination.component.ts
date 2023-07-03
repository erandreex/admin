import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ModeloPaginacion } from './ModeloPaginacion';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
    public paginaMinima: number = 0;
    public paginaMaxima: number = 0;
    public indiceInicial: number = 0;
    public indiceFinal: number = 0;
    public totalItemsArray: number = 0;

    @Input() itemsPerPage: number = 12;
    @Input() paginaActual: number = 1;
    @Input() arrayInfo: any[] = [];
    @Input() estilo: number = 1;

    @Output() changePage: EventEmitter<ModeloPaginacion> = new EventEmitter<ModeloPaginacion>();

    opcionesEstilo: number[] = [1, 2];

    constructor() {}

    reset() {
        if (!this.opcionesEstilo.includes(this.estilo)) {
            this.estilo = 1;
        }

        if (this.arrayInfo.length > 0) {
            this.paginaMinima = 1;
        }

        this.paginaMaxima = Math.ceil(this.arrayInfo.length / this.itemsPerPage);

        this.totalItemsArray = this.arrayInfo.length;
        this.paginaActual = 1;
    }

    onPreviousPage(num: number): void {
        this.currentPage -= num;
    }

    onNextPage(num: number): void {
        this.currentPage += num;
    }

    onLastPage(): void {
        this.currentPage = this.paginaMaxima;
    }

    onFirstPage(): void {
        this.currentPage = this.paginaMinima;
    }

    get currentPage(): number {
        return this.paginaActual;
    }

    set currentPage(page: number) {
        this.paginaActual = page;
        this.indices();
        this.changePage.emit(this.respuestaPaginacion());
    }

    indices() {
        this.indiceInicial = (this.paginaActual - 1) * this.itemsPerPage + 1;

        if (this.paginaActual == this.paginaMaxima) {
            this.indiceFinal = this.totalItemsArray;
        } else {
            this.indiceFinal = this.paginaActual * this.itemsPerPage;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.reset();
        this.indices();
        Promise.resolve().then((e) => this.changePage.emit(this.respuestaPaginacion()));
    }

    respuestaPaginacion(): ModeloPaginacion {
        return {
            itemsArray: this.arrayInfo.slice(
                (this.paginaActual - 1) * this.itemsPerPage,
                this.paginaActual * this.itemsPerPage
            ),
            totalItemsArray: this.totalItemsArray,
            cantidadItemsPorPagina: this.itemsPerPage,
            indiceInicialPaginaActual: this.indiceInicial,
            indiceFinalPaginaActual: this.indiceFinal,
            paginaActual: this.paginaActual,
            paginaMaxima: this.paginaMaxima,
            paginaMinima: this.paginaMinima,
        };
    }
}
