export interface ModeloRutaCategoria {
    id: string;
    titulo: string;
    ruta: string;
    icono: string;
    color_1: string;
    color_2: string;
    orden: string;
}

export interface RespuestaModeloRutaCategoria {
    rutas: ModeloRutaCategoria[];
}

export interface RespuestaCreacionRutaCategoria {
    ruta: ModeloRutaCategoria;
}
