export interface Ruta {
    categoria_id: string;
    categoria_titulo: string;
    id: string;
    orden: number;
    titulo: string;
    ruta: string;
    icono: string;
    color_1: string;
    color_2: string;
    componente: string;
}

export interface RutasCategorias {
    categoria_id: string;
    categoria_titulo: string;
}

export interface RutaDetalles {
    categoria_id: string;
    categoria_orden: number;
    categoria_titulo: string;
    categoria_ruta: string;
    categoria_icono: string;
    categoria_color_1: string;
    categoria_color_2: string;
    ruta_id: string;
    ruta_orden: number;
    ruta_titulo: string;
    ruta_ruta: string;
    ruta_icono: string;
    ruta_color_1: string;
    ruta_color_2: string;
    ruta_categoria: string;
    ruta_componente: string;
}

export interface RespuestaListaRutas {
    rutas: Ruta[];
    categorias: RutasCategorias[];
}

export interface RespuestaCrearRutas {
    ruta: RutaDetalles;
}

export interface RespuestaActualizarRutas {
    ruta: RutaDetalles;
}

export interface RespuestaRemoverRutas {
    ruta: RutaDetalles;
}
