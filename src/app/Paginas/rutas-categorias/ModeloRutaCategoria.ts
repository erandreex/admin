export interface ModeloRutaCategoria {
    id: string;
    titulo: string;
    ruta: string;
    icono: string;
    color_1: string;
    color_2: string;
    orden: string;
}

export interface RespuestaListaRutaCategoria {
    rutas_categorias: ModeloRutaCategoria[];
}

export interface RespuestaCrearRutaCategoria {
    ruta_categoria: ModeloRutaCategoria;
}

export interface RespuestaActualizarRutaCategoria {
    ruta_categoria: ModeloRutaCategoria;
}

export interface RespuestaRemoverRutaCategoria {
    ruta_categoria: ModeloRutaCategoria;
}
