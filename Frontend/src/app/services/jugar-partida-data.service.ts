import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugarPartidaDataService {

  public altura = new BehaviorSubject(0);
  alturaActual = this.altura.asObservable();

  public ancho = new BehaviorSubject(0);
  anchoActual = this.ancho.asObservable();

  public dificultad = new BehaviorSubject('');
  dificultadActual = this.dificultad.asObservable();

  public correoElectronico = new BehaviorSubject('');
  correoElectronicoActual = this.dificultad.asObservable();

  public identificador = new BehaviorSubject('');
  identificadorActual = this.identificador.asObservable();


  constructor() { }

  cambiarAltura(altura: number){
    this.altura.next(altura)
  }

  cambiarAncho(ancho: number){
    this.ancho.next(ancho)
  }

  cambiarDificultad(dificultad: string){
    this.dificultad.next(dificultad)
  }

  cambiarCorreo(correoElectronico: string){
    this.correoElectronico.next(correoElectronico)
  }

  cambiarIdentificador(identificador: string){
    this.identificador.next(identificador)
  }

}
