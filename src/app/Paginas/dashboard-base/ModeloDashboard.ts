export interface ModeloDashboardRespuestaCuadricula {
    cuadricula: ModeloComponenteCuadricula[];
    parametros: ModeloDashboardParametros;
}

export interface ModeloComponenteCuadricula {
    id: string;
    nombre: string;
    tipo: string;
    componente_id: string;
    orden: number;
    tamano_xlarge: string;
    tamano_large: string;
    tamano_medium: string;
    tamano_small: string;
}

export interface ModeloDashboardParametros {
    grafica_height: string;
    tamano_large: string;
    tamano_mediun: string;
    tamano_small: string;
    tamano_xlarge: string;
}

export interface ModeloComponentePropiedades {
    propiedad_ancho: number;
    propiedad_alto: number;
    span_alto: string;
    span_ancho: string;
}

export interface ModeloConfiguracionComponente {
    configuracion: ModeloComponenteCuadricula;
    propiedades: ModeloComponentePropiedades;
}
