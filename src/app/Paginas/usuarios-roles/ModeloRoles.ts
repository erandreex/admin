export interface ModeloRol {
    id: string;
    nombre: string;
}

export interface RespuestaModeloRol {
    roles: ModeloRol[];
}

export interface RespuestaCreacionRol {
    rol: ModeloRol;
}