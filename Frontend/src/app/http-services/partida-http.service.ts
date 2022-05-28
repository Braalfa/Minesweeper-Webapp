import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidaBuscaminas } from '../models/PartidaBuscaminas';

@Injectable({
  providedIn: 'root'
})
export class PartidaHttpService {

  URL = 'https://backendredes.azurewebsites.net/api/Partida/'

  constructor(public http: HttpClient) { }

  public crearPartida(partidaBuscaminas: PartidaBuscaminas):Observable<PartidaBuscaminas>{
    return this.http.post<PartidaBuscaminas>(this.URL+"crear",{},{params:{altura:partidaBuscaminas.altura!, anchura:partidaBuscaminas.anchura!,
          dificultad:partidaBuscaminas.dificultad!,email:partidaBuscaminas.email!}});
  }

  public realizarMovimiento(fila: number, columna: number, id:number):Observable<PartidaBuscaminas>{
    return this.http.put<PartidaBuscaminas>(this.URL+"realizaMovimiento",{},{params:{fila, columna, id}});
  }

  public cambiarEstadoCasilla(fila: number, columna: number, id:number, estado:number):Observable<PartidaBuscaminas>{
    return this.http.put<PartidaBuscaminas>(this.URL+"cambiarEstadoCasilla",{},{params:{fila, columna, id, estado}});
  }

  public getPartida(email: any):Observable<PartidaBuscaminas>{
    return this.http.get<PartidaBuscaminas>(this.URL+"buscarActiva",{params:{email}});
  }
  //
  // public cambiarTurnoTiempo(partida: Partida):Observable<Partida>{
  //   return this.http.put<Partida>(this.URL+"Tiempo", partida);
  // }
  //
  // public disparar(partida: Partida, casillaDisparo: number):Observable<Partida>{
  //   return this.http.put<Partida>(this.URL+"Disparar", partida, {params:{casillaDisparo}});
  // }
  //
  // public getPartidaNaves(idJugador: string, idPartida: number):Observable<any>{
  //   return this.http.get<Observable<any>>(this.URL_partidaNave, {params:{idJugador,idPartida}});
  // }
  //
  // public getNaves():Observable<Nave[]>{
  //   return this.http.get<Nave[]>(this.URL_nave);
  // }
}
