export interface ModeloPermisosRolRuta {
    id: string;
    rol_id: string;
    rol_nombre: string;
    categoria_titulo: number;
    ruta_titulo: string;
    ruta_id: string;
}

export interface ModeloExternoRuta {
    id: string;
    titulo: string;
    categoria_id: string;
}

export interface ModeloExternoRutaCategorias {
    categoria_id: string;
    categoria_titulo: string;
}

export interface ModeloExternoRoles {
    rol_id: string;
    rol_nombre: string;
}

export interface RespuestaListaPermisoRolRuta {
    'permisos-roles-rutas': ModeloPermisosRolRuta[];
    rutas: ModeloExternoRuta[];
    'rutas-categorias': ModeloExternoRutaCategorias[];
    roles: ModeloExternoRoles[];
}

export interface RespuestaAgregarPermisoRolRuta {
    'permiso-rol-ruta': ModeloPermisosRolRuta;
}

export interface RespuestaRemoverPermisoRolRuta {
    'permiso-rol-ruta': ModeloPermisosRolRuta;
}
