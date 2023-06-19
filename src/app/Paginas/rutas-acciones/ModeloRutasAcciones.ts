export interface ModeloRutasAcciones {
    id: string;
    controlador: string;
    metodo: string;
    estado: string;
    descripcion: string;
    fk_ruta: string;
}

export interface RespuestaModeloRutasAcciones {
    'rutas-acciones': ModeloRutasAcciones[];
}
