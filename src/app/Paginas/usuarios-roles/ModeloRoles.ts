export interface ModeloRol {
    id: string;
    nombre: string;
}

export interface RespuestaModeloRol {
    roles: ModeloRol[];
}

export interface RespuestaCrearRol {
    rol: ModeloRol;
}

export interface RespuestaActualizarRol {
    rol: ModeloRol;
}

export interface RespuestaRemoverRol {
    rol: ModeloRol;
}
