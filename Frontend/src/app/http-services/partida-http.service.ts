import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nave } from '../models/Nave';
import { Partida } from '../models/Partida';

@Injectable({
  providedIn: 'root'
})
export class PartidaHttpService {

  URL = 'https://localhost:5001/api/partida/'
  URL_partidaNave = 'https://localhost:5001/api/PartidaNave/'
  URL_nave = 'https://localhost:5001/api/Nave/'
  constructor(public http: HttpClient) { }

  public getPartidas(codigoEvento: string):Observable<Partida[]>{
    return this.http.get<Partida[]>(this.URL+"buscar", {params:{codigoEvento}});
  }

  public getPartida(id: any):Observable<Partida>{
    return this.http.get<Partida>(this.URL+id);
  }

  public cambiarTurnoTiempo(partida: Partida):Observable<Partida>{
    return this.http.put<Partida>(this.URL+"Tiempo", partida);
  }

  public disparar(partida: Partida, casillaDisparo: number):Observable<Partida>{
    return this.http.put<Partida>(this.URL+"Disparar", partida, {params:{casillaDisparo}});
  }

  public getPartidaNaves(idJugador: string, idPartida: number):Observable<any>{
    return this.http.get<Observable<any>>(this.URL_partidaNave, {params:{idJugador,idPartida}});
  }

  public getNaves():Observable<Nave[]>{
    return this.http.get<Nave[]>(this.URL_nave);
  }
}
