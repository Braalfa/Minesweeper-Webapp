import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugarPartidaService {

  public codigoEvento = new BehaviorSubject('');
  codigoEventoActual = this.codigoEvento.asObservable();

  public idPartida = new BehaviorSubject(0);
  idPartidaActual = this.idPartida.asObservable();

  public jugador = new BehaviorSubject('');
  jugadorActual = this.jugador.asObservable();


  constructor() { }

  cambiarCodigoEvento(codigoEvento: string){
    this.codigoEvento.next(codigoEvento)
  }

  cambiarIdPartida(idPartida: number){
    this.idPartida.next(idPartida)
  }

  cambiarJugador(jugador: string){
    this.jugador.next(jugador)
  }
}
