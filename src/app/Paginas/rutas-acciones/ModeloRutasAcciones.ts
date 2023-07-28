export interface ModeloRutasAcciones {
    id: string;
    controlador: string;
    endpoint: string;
    metodo: string;
    estado: string;
    descripcion: string;
    ruta_id: string;
    ruta_titulo: string;
    categoria_id: string;
    categoria_titulo: string;
}

export interface ModeloExternoRutaCategorias {
    categoria_id: string;
    categoria_titulo: string;
}

export interface ModeloExternoRuta {
    id: string;
    titulo: string;
    categoria_id: string;
}

export interface ModeloOpcionesHttp {
    nombre: string;
    valor: string;
}

export interface RespuestaListaRutasAcciones {
    'rutas-acciones': ModeloRutasAcciones[];
    'rutas-categorias': ModeloExternoRutaCategorias[];
    rutas: ModeloExternoRuta[];
    'metodos-http': ModeloOpcionesHttp[];
}

export interface RespuestaActualizarRutaAccion {
    'ruta-accion': ModeloRutasAcciones;
}

export interface RespuestaCrearRutaAccion {
    'ruta-accion': ModeloRutasAcciones;
}

export interface RespuestaRemoverRutaAccion {
    'ruta-accion': ModeloRutasAcciones;
}
