import { ModeloPreferenciaGeneral, ModeloTema } from '../../Modelos/ModelosPreferencias';

export interface ModeloRespuestaLogin {
    preferenciasGenerales: ModeloPreferenciaGeneral;
    tema: ModeloTema;
}
