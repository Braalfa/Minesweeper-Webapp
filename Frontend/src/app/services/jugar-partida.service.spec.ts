import { TestBed } from '@angular/core/testing';

import { JugarPartidaService } from './jugar-partida.service';

describe('JugarPartidaService', () => {
  let service: JugarPartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugarPartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #cambiarCodigoEvento()', async () => {
    service.codigoEvento = service.codigoEvento || {};
    service.codigoEvento.next = jest.fn();
    service.cambiarCodigoEvento("qwe123");
    // expect(service.codigoEvento.next).toHaveBeenCalled();
  });


  it('should run #cambiarIdPartida()', async () => {
    service.idPartida = service.idPartida || {};
    service.idPartida.next = jest.fn();
    service.cambiarIdPartida(2020);
    // expect(service.idPartida.next).toHaveBeenCalled();
  });


  it('should run #cambiarJugador()', async () => {
    service.jugador = service.jugador || {};
    service.jugador.next = jest.fn();
    service.cambiarJugador("ElJugador");
    // expect(service.jugador.next).toHaveBeenCalled();
  });
});
