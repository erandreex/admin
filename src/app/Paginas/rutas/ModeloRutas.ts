export interface Rutas {
    rutas: Ruta[];
}

export interface Ruta {
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

export interface RutaCreacion {
    id: string;
    titulo: string;
    orden: string;
    ruta: string;
    icono: string;
    color_1: string;
    color_2: string;
    componente: string;
    fk_categoria: string;
}

export interface RutaListaHTML {
    categoria_id: string;
    categoria_orden: number;
    categoria_titulo: string;
    categoria_ruta: string;
    categoria_icono: string;
    categoria_color_1: string;
    categoria_color_2: string;
    rutas: Ruta[];
}

export interface RespuestaModeloRutas {
    rutas: Ruta[];
}

export interface RespuestaCreacionRuta {
    ruta: Ruta;
}
