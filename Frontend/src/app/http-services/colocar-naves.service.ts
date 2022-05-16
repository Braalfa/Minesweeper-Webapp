import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NaveCompuesta} from "../models/NaveCompuesta";
import {Partida} from "../models/Partida";
import {PartidaNave} from "../models/PartidaNave";

@Injectable({
  providedIn: 'root'
})
export class ColocarNavesService {

  URL = 'https://localhost:5001/api/'
  constructor(public http: HttpClient) {}

  public getNaves(codigoEvento: string):Observable<[NaveCompuesta]>{
    return this.http.get<[NaveCompuesta]>(this.URL+"NaveEvento/joinNave", {params:{codigoEvento}});
  }
  public crearPartida(partidaData: any):Observable<Partida>{
    return this.http.post<Partida>(this.URL+"partida", partidaData );
  }
  public ingresarAPartida(partidaData: any):Observable<any>{
    return this.http.put<Observable<any>>(this.URL+"partida/ingresar", partidaData );
  }

  public postPartidaNaves(naves: PartidaNave[]):Observable<any>{
    return this.http.post<Observable<any>>(this.URL+"PartidaNave", naves);
  }

  public getPartidaEstado(idPartida: number): Observable<Partida>{
    return this.http.get<Partida>(this.URL+"partida/estado", {params:{idPartida}});
  }
}
