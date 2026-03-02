import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PicoPlacaRequest,
  PicoPlacaResponse,
  HistorialConsultaRespuesta,
  RespuestaPaginada
} from '../models/pico-placa.model';

@Injectable({
  providedIn: 'root'
})
export class PicoPlacaService {

  private apiUrl = 'http://localhost:8080/api/pico-placa';

  constructor(private http: HttpClient) {}


  validar(data: PicoPlacaRequest): Observable<PicoPlacaResponse> {
    return this.http.post<PicoPlacaResponse>(
      `${this.apiUrl}/validar`,
      data
    );
  }


  obtenerHistorial(
    pagina: number,
    tamanio: number
  ): Observable<RespuestaPaginada<HistorialConsultaRespuesta>> {

    const params = new HttpParams()
      .set('page', pagina)
      .set('size', tamanio);

    return this.http.get<RespuestaPaginada<HistorialConsultaRespuesta>>(
      `${this.apiUrl}/historial`,
      { params }
    );
  }


  eliminarPorId(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/historial/${id}`
    );
  }


  eliminarTodo(): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/historial`
    );
  }
}