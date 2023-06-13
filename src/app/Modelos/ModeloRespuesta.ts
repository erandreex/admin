import { ModeloError } from './ModeloError';

export interface ModeloRespuesta<T> {
    ok: boolean;
    code: number;
    status: string;
    mensaje: string;
    token: string;
    error: ModeloError;
    respuesta: T;
}
