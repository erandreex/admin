export interface ConfigGrafica {
    configTipoGrafica: string;
    configPosicion: number;
    configSubPosicion: number;
    configTipoRutina: string;
    configRutina: string;
    configTitulo: string;
    configDatasetlabel: string;
    configLabely: string;
    configTipoPrincipal: string;
    configTipoSecundario: string;
    configColorFondo: string;
    configColorBorde: string;
    configTamanoBorde: string;
    configFill: string;
    configColorFondoPunto: string;
    configColorHoverPunto: string;
    configColorBordePunto: string;
    configTamanoPunto: string;
    configStacked: string;
    configStack: string;
    configMin: string;
    configMax: string;
    configSuggestedMax: string;
    configMaxTickLimit: string;
    configTipoConsulta: string;
    configCantRegistros: string;
    configTipoRegistros: string;
    configFechaMod: string;
    configValorLimite: string;
    configColorValorLimite: string;
    configIntervaloTiempo: string;
    configColorAleatorio: string;
    configCantidadDecimales: string;
    configValorMinimo: string;
}

export interface DataDataset {
    graficaData: number[];
    graficaLabel: string;
    graficaPointBackgroundColor: string;
    graficaPointBorderColor: string;
    graficaPointHoverColor: string;
    graficaPointRadius: string;
    graficaFil: boolean;
    graficaType: string;
    graficaStack: string;
    graficaBackgroundColor: string[];
    graficaBorderColor: string;
    graficaBorderWidth: string;
}
