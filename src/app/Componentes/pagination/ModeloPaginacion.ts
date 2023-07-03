export interface ModeloPaginacion<T> {
    itemsArray: T[];
    totalItemsArray: number;
    cantidadItemsPorPagina: number;
    indiceInicialPaginaActual: number;
    indiceFinalPaginaActual: number;
    paginaActual: number;
    paginaMaxima: number;
    paginaMinima: number;
}
