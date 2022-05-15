import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PartidaHttpService } from './partida-http.service';
import { Observable, of } from 'rxjs';

describe('PartidaHttpService', () => {
  let service: PartidaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(PartidaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #getPartidas()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getPartidas("abcd1234");
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #cambiarTurnoTiempo()', async () => {
    service.http = service.http || {};
    service.http.put = jest.fn().mockReturnValue(of('put'));
    service.cambiarTurnoTiempo({
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
    // expect(service.http.put).toHaveBeenCalled();
  });

  it('should run #disparar()', async () => {
    service.http = service.http || {};
    service.http.put = jest.fn().mockReturnValue(of('put'));
    service.disparar({
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
    }, 5);
    // expect(service.http.put).toHaveBeenCalled();
  });

  it('should run #getPartidaNaves()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getPartidaNaves("qwe213", 2121);
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getNaves()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getNaves();
    // expect(service.http.get).toHaveBeenCalled();
  });
});
