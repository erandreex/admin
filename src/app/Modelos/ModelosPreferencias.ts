export interface ModeloRespuestaPreferencias {
    preferenciasGenerales: ModeloPreferenciaGeneral;
    tema: ModeloTema;
}

export interface ModeloPreferenciaGeneral {
    tema: string;
}

export interface ModeloTema {
    id: string;
    nombre: string;
    siderbar_backgroud_1: string;
    siderbar_backgroud_2: string;
    sidebar_text_color: string;
    sidebar_icon_color: string;
    sidebar_border_color: string;
}
