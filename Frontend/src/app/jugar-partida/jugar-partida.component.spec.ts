import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarPartidaComponent } from './jugar-partida.component';
import { CountdownComponent, CountdownEvent, CountdownTimer} from 'ngx-countdown';

import { FormsModule } from '@angular/forms';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { ReturnModalComponent } from '../return-modal/return-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, scheduled } from 'rxjs';
import { Registro } from '../models/Registro';

require('bootstrap/js/dist/modal');

export enum CountdownStatus {
  ing,
  pause,
  stop,
  done,
}

jest.mock('ngx-countdown',() => {
  const originalModule = jest.requireActual('ngx-countdown');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    CountdownEvent: {
      action: "done",
      status: "done",
      left: 2000,
      text: "some Text"
    },
  };
});

describe('JugarPartidaComponent', () => {
  let component: JugarPartidaComponent;
  let fixture: ComponentFixture<JugarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ JugarPartidaComponent, ErrorModalComponent, ReturnModalComponent, CountdownComponent],
      providers: [CountdownTimer]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', async () => {
    component.createBoard = jest.fn();
    component.addListenerSeleccionCoordenada = jest.fn();
    component.ngOnInit();
    // expect(component.createBoard).toHaveBeenCalled();
    // expect(component.seleccionarCoordenada).toHaveBeenCalled();
  });


/*  it('should run #seleccionarCoordenada()', async () => {
    component.player2Squares = component.player2Squares || {};
    component.player2Squares = ['player2Squares'];
    component.currentCoord = component.currentCoord || {};
    component.currentCoord.id = 'id';
    component.currentCoord.style = {
      cssText: {}
    };
    let square:any = "";
    component.seleccionarCoordenada(square);

  });*/


  it('should run #createBoard()', async () => {

    component.createBoard({
      appendChild: function() {}
    }, {
      push: function() {}
    });

  });


  it('should run #disparar Jugador1()', async () => {
    component.currentSelectedCord = component.currentSelectedCord || {};
    component.currentSelectedCord.id = 'id';
    component.currentSelectedCord.style = {
      cssText: {}
    };

    component.partida = {
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
    };

    component.partida.jugador1 = component.jugador1Real;
    component.partidaHttpService = component.partidaHttpService || {};
    component.partidaHttpService.disparar = jest.fn().mockReturnValue(of(component.partida));
    component.terminarPartida = jest.fn();
    component.markShots = jest.fn();
    component.restartTimer = jest.fn();
    component.startTimer = jest.fn();
    component.waitUntilTurn = jest.fn();

    component.disparar();

  });

  it('should run #disparar Jugador2()', async () => {
    component.currentSelectedCord = component.currentSelectedCord || {};
    component.currentSelectedCord.id = 'id';
    component.currentSelectedCord.style = {
      cssText: {}
    };

    component.partida = {
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
    };

    component.partida.jugador1 = "Jugador1";
    component.partidaHttpService = component.partidaHttpService || {};
    component.partidaHttpService.disparar = jest.fn().mockReturnValue(of({
      partida: {}
    }));


    component.disparar();

  });


  /*it('should run #cambiarTurnos()', async () => {

    component.cambiarTurnos();

  });*/


  it('should run #startTimer()', async () => {
    component.countdown = component.countdown || {};
    component.countdown.begin = jest.fn();
    component.startTimer();
    // expect(component.countdown.begin).toHaveBeenCalled();
  });


  it('should run #restartTimer()', async () => {
    component.countdown = component.countdown || {};
    component.countdown.restart = jest.fn();
    component.restartTimer();
    // expect(component.countdown.restart).toHaveBeenCalled();
  });


  it('should run #stopTimer()', async () => {
    component.countdown = component.countdown || {};
    component.countdown.stop = jest.fn();
    component.stopTimer();
    // expect(component.countdown.stop).toHaveBeenCalled();
  });


  it('should run #pauseTimer()', async () => {
    component.countdown = component.countdown || {};
    component.countdown.pause = jest.fn();
    component.pauseTimer();
    // expect(component.countdown.pause).toHaveBeenCalled();
  });


  it('should run #resumeTimer()', async () => {
    component.countdown = component.countdown || {};
    component.countdown.resume = jest.fn();
    component.resumeTimer();
    // expect(component.countdown.resume).toHaveBeenCalled();
  });


  it('should run #onTimerFinished()', async () => {
    component.partida = {
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
    };
    const countdownstat = CountdownStatus.done;
    //component.cambiarTurnos = jest.fn();
    component.restartTimer = jest.fn();
    component.startTimer = jest.fn();
    component.partida.turno = component.jugador1Real;
    component.partidaHttpService = component.partidaHttpService || {};
    component.partidaHttpService.cambiarTurnoTiempo = jest.fn().mockReturnValue(of({
      partida: {}
    }));
    component.onTimerFinished({
      status: countdownstat,
      left: 2000,
      text: "Format the text",
      action: "done"
    });
    // expect(component.cambiarTurnos).toHaveBeenCalled();
    // expect(component.restartTimer).toHaveBeenCalled();
    // expect(component.startTimer).toHaveBeenCalled();
  });

  it('should run #onTimerFinishedJugador2()', async () => {
    component.partida = {
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
    };
    const countdownstat = CountdownStatus.done;
    //component.cambiarTurnos = jest.fn();
    component.restartTimer = jest.fn();
    component.startTimer = jest.fn();
    component.partida.turno = component.jugador1Real;
    component.partidaHttpService = component.partidaHttpService || {};
    component.partidaHttpService.cambiarTurnoTiempo = jest.fn().mockReturnValue(of({
      partida: {}
    }));
    component.partida.jugador1 = component.jugador1Real;
    component.onTimerFinished({
      status: countdownstat,
      left: 2000,
      text: "Format the text",
      action: "done"
    });
    // expect(component.cambiarTurnos).toHaveBeenCalled();
    // expect(component.restartTimer).toHaveBeenCalled();
    // expect(component.startTimer).toHaveBeenCalled();
  });

  it('should run #terminarPartida Gana Judador 2()', async () => {
    component.partida = {
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
      estado:"Terminada"
    };

    component.obtainPorcentajeAciertos = jest.fn();

    component.turno = component.jugador1Real;

    component.terminarPartida();
    component.stopTimer = jest.fn();
  });

    it('should run #terminarPartida Gana Judador 1()', async () => {
    component.partida = {
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
      estado:"Terminada"
    };

    component.obtainPorcentajeAciertos = jest.fn();

    component.turno = 'Jugador1';

    component.terminarPartida();
    component.stopTimer = jest.fn();
  });

  it('should run #obtainPorcentajeAciertos()', async () => {

    /*let registro = {
      index: 0,
      coords: 0,
      columna: 0,
      fila: "",
      player: "",
      result: "",
      length: 2,
       pop: "",
       push:"",
       concat: "",
       join: "",
       reverse: "",
       shift: "",
       slice: ""
    };*/
    let jugador1 = "jugador1";
    let registro: Registro = {
      index: 0,
      coords: 0,
      columna: 0,
      fila: "",
      player: "",
      result: "",
    };
    let registros: Registro[] = [registro, registro]

    component.obtainPorcentajeAciertos(jugador1, registros);
    //const mockCallback = jest.fn(x => 42 + x);
    //forEach([0, 1], mockCallback);
  });

});
