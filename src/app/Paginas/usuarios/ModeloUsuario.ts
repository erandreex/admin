export interface ModeloUsuario {
    id: string;
    nombre: string;
    apellido: string;
    username: string;
    password: string;
    correo: string;
    correo_lower: string;
    pass_key: string;
    estado: string;
    rol_id: string;
}

export interface ModeloRoles {
    id: string;
    nombre: string;
}

export interface RespuestaModeloUsuario {
    usuarios: ModeloUsuario[];
    roles: ModeloRoles[];
}

export interface RespuestaCreacionUsuario {
    usuario: ModeloUsuario;
}
