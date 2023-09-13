export interface ModeloGraficaConfig {
    id: string;
    nombre: string;
    titulo: string;
    cant_registros: number;
    tipo_registros: string;
    label_y: string;
    stacked: string;
    background: string;
    max_tick_limit: number;
    max_suggested: number;
}

export interface ModeloGraficaDatasetConfig {
    grafica_id: string;
    dataset_id: string;
    dataset_posicion: number;
    proc_nombre: string;
    proc_tipo: string;
    proc_operacion: string;
    rutina: string;
    dataset_label: string;
    tipoPrincipal: string;
    tipoSecundario: string;
    fondo_color: string;
    borde_color: string;
    borde_tamano: string;
    punto_color_fondo: string;
    punto_color_hover: string;
    punto_color_borde: string;
    punto_tamano: string;
    stack: number;
    fill: string;
}

export interface ModeloGraficaDatasetData {
    dataRutina: string;
    dataFecha: string;
    dataCantidad: number;
    dataPosicion: number;
}

export interface ModeloDataGraficaFinal {
    graficaData: number[];
    graficaLabel: string;
    graficaPointBackgroundColor: string;
    graficaPointBorderColor: string;
    graficaPointHoverColor: string;
    graficaPointRadius: string;
    graficaFill: boolean;
    graficaType: string;
    graficaStack: number;
    graficaBorderColor: string;
    graficaBorderWidth: string;
}

export interface ModeloRespuestaGraficaConsulta {
    graficaConfig: ModeloGraficaConfig;
    datasetsConfig: ModeloGraficaDatasetConfig[];
    datasetsData: ModeloGraficaDatasetData[];
    datasetsLabels: string[];
}

export interface ModeloGraficaConsulta {
    idGrafica: string;
    cantRegistros: number;
    consultaFecha: string;
}
