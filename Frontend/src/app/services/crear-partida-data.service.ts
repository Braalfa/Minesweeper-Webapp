import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NumeroJugador } from '../colocar-naves/numeroJugador';
import { Partida } from '../models/Partida';

@Injectable({
  providedIn: 'root'
})
export class CrearPartidaDataService {

  public usernameJugador = new BehaviorSubject('');
  usernameJugadorActual = this.usernameJugador.asObservable();

  public numeroJugador = new BehaviorSubject(NumeroJugador.jugador1);
  numeroJugadorActual = this.numeroJugador.asObservable();

  public partida = new BehaviorSubject(<Partida>{});
  partidaActual = this.partida.asObservable();

  public codigoEvento = new BehaviorSubject('');
  codigoEventoActual = this.codigoEvento.asObservable();

  public tableroFilas = new BehaviorSubject(0);
  tableroFilasActual = this.tableroFilas.asObservable();

  public tableroColumnas = new BehaviorSubject(0);
  tableroColumnasActual = this.tableroColumnas.asObservable();

  public numeroNaves = new BehaviorSubject(0);
  numeroNavesActual = this.numeroNaves.asObservable();

  private tokenEvento = new BehaviorSubject('');
  tokenEventoActual = this.tokenEvento.asObservable();

  constructor() {}

  cambiarUsernameJugador(usernameJugador: string){
    this.usernameJugador.next(usernameJugador)
  }

  cambiarNumeroJugador(numeroJugador: NumeroJugador){
    this.numeroJugador.next(numeroJugador)
  }

  cambiarPartida(partida: Partida){
    this.partida.next(partida)
  }

  cambiarCodigoEvento(codigo: string) {
    this.codigoEvento.next(codigo)
  }

  cambiarColumnas(col: number) {
    this.tableroColumnas.next(col)
  }

  cambiarFilas(filas: number) {
    this.tableroFilas.next(filas)
  }

  cambiarNumeroNaves(numeroNaves: number) {
    this.numeroNaves.next(numeroNaves)
  }

  cambiarTokenEvento(token: string){
    this.tokenEvento.next(token)
  }

}
