export interface PicoPlacaRequest {
  placa: string;
  fechaHora: string;
}

export interface PicoPlacaResponse {
  placa: string;
  puedeCircular: boolean;
  mensaje: string;
}

export interface HistorialConsultaRespuesta {
  id: number;
  placa: string;
  fechaHora: string;
  puedeCircular: boolean;
}

export interface RespuestaPaginada<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}