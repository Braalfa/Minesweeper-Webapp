import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Partida } from '../models/Partida';
import { NumeroJugador } from '../colocar-naves/numeroJugador';

import { CrearPartidaDataService } from './crear-partida-data.service';


describe('CrearPartidaDataService', () => {
  let service: CrearPartidaDataService;

  beforeEach(() => {
    service = new CrearPartidaDataService();
  });

  it('should run #cambiarUsernameJugador()', async () => {
    service.usernameJugador = service.usernameJugador || {};
    service.usernameJugador.next = jest.fn();
    service.usernameJugador.next("Otro nombreee");
    service.cambiarUsernameJugador("Otro nombreee");
    // expect(service.usernameJugador.next).toHaveBeenCalled();
  });

  it('should run #cambiarNumeroJugador()', async () => {
    let numeroJugador: NumeroJugador;
    numeroJugador = NumeroJugador.jugador1;
    service.numeroJugador = service.numeroJugador || {};
    service.numeroJugador.next = jest.fn();
    service.cambiarNumeroJugador(numeroJugador);
    // expect(service.numeroJugador.next).toHaveBeenCalled();
  });

  it('should run #cambiarPartida()', async () => {
    let partida:Partida = new Partida();
    service.partida = service.partida || {};
    service.partida.next = jest.fn();
    service.cambiarPartida(partida);
    // expect(service.partida.next).toHaveBeenCalled();
  });

  it('should run #cambiarCodigoEvento()', async () => {
    service.codigoEvento = service.codigoEvento || {};
    service.codigoEvento.next = jest.fn();
    service.cambiarCodigoEvento("abcd1234");
    expect(service.codigoEvento.next).toHaveBeenCalled();
  });

  it('should run #cambiarColumnas()', async () => {
    service.tableroColumnas = service.tableroColumnas || {};
    service.tableroColumnas.next = jest.fn();
    service.cambiarColumnas(15);
    expect(service.tableroColumnas.next).toHaveBeenCalled();
  });

  it('should run #cambiarFilas()', async () => {
    service.tableroFilas = service.tableroFilas || {};
    service.tableroFilas.next = jest.fn();
    service.cambiarFilas(15);
    expect(service.tableroFilas.next).toHaveBeenCalled();
  });

  it('should run #cambiarNumeroNaves()', async () => {
    service.numeroNaves = service.numeroNaves || {};
    service.numeroNaves.next = jest.fn();
    service.cambiarNumeroNaves(5);
    // expect(service.numeroNaves.next).toHaveBeenCalled();
  });






});

