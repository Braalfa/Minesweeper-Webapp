import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ColocarNavesService } from './colocar-naves.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('ColocarNavesService', () => {
  let service: ColocarNavesService;
  let http: HttpClient;

  beforeEach(() => {
    service = new ColocarNavesService(http);
  });

  it('should run #getNaves()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getNaves("abcd1234");
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #crearPartida()', async () => {
    service.http = service.http || {};
    service.http.post = jest.fn().mockReturnValue(observableOf('post'));
    service.crearPartida({
      identificador:123456,
      evento:"qwe",
      jugador1:"jugador1",
      jugador2:"jugador2",
      turno: "Jugador2",
      tableronaves1:12,
      tableronaves2:12,
      tablerodisparos1:["h1","h2","h3","h4"],
      tablerodisparos2:["b1","b2","b3","b4"],
      registro: ["b1","b2","b3","b4"],
      fechacreacion: "5-10-2021",
      estado:"activa"
    });
    // expect(service.http.post).toHaveBeenCalled();
  });

  it('should run #postPartidaNaves()', async () => {
    service.http = service.http || {};
    service.http.post = jest.fn().mockReturnValue(observableOf('post'));
    service.postPartidaNaves([{identificador:1, naveid:2, partidaid:3, posminx:20, posminy:20, jugador:"jugador1", golpes:3, estado:"entero"}]);
    // expect(service.http.post).toHaveBeenCalled();
  });

  it('should run #getPartidaEstado()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getPartidaEstado(85518595);
    // expect(service.http.post).toHaveBeenCalled();
  });

});
