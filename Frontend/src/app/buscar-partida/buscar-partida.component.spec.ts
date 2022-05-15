import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BuscarPartidaComponent } from './buscar-partida.component';
import { of, scheduled } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { ReturnModalComponent } from '../return-modal/return-modal.component';
import { Partida } from '../models/Partida';
import $ from 'jquery';

require('bootstrap/js/dist/modal');

describe('BuscarPartidaComponent', () => {
  let component: BuscarPartidaComponent;
  let fixture: ComponentFixture<BuscarPartidaComponent>;
  let definedEvent: {codigo: 'codigo', llave:'AAA000', cliente:'', nombre:'Evento1', fechafinalizacion:undefined, fechainicio:undefined, pais:'Costa Rica', localidad:'Heredia', tablerofilas:20, tablerocolumnas:20, tiempodisparo:5,tipopartidas:'I', numeronaves:5};
  let partidaServiceMock: any
  let eventoServiceMock: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPartidaComponent, ErrorModalComponent, ReturnModalComponent  ],
      imports:[RouterTestingModule, HttpClientModule, FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPartidaComponent);
    component = fixture.componentInstance;
    partidaServiceMock = component.partidaHttpService
    eventoServiceMock = component.eventoHttpService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {

    component.ngOnInit();

  });

  it('should run #searchEventos()', async () => {
    eventoServiceMock = eventoServiceMock || {};
    eventoServiceMock.getEvento = jest.fn().mockReturnValue(of(true));
    component.evento = component.evento || definedEvent
    partidaServiceMock = partidaServiceMock || {};
    partidaServiceMock.getPartidas = jest.fn().mockReturnValue(of(true));
    component.partidas = component.partidas || {};
    await component.searchEventos();
    expect(eventoServiceMock.getEvento).toHaveBeenCalled();
    expect(partidaServiceMock.getPartidas).toHaveBeenCalled();
    expect(component.tokenTouched).toBe(true);
  });

  it('should run #searchEventosTry()', async () => {
    eventoServiceMock = eventoServiceMock || {};
    eventoServiceMock.getEvento = jest.fn().mockReturnValue(of(true));
    component.evento = component.evento || definedEvent
    partidaServiceMock = partidaServiceMock || {};
    partidaServiceMock.getPartidas = jest.fn().mockReturnValue(of(true));
    component.partidas = component.partidas || {};

    try {
      throw new Error('{status:200}');
      partidaServiceMock.getPartidas();
    } catch (e) {
      //expect(e[0]).toMatch('200');
      e.status=200;
    }
    await component.searchEventos();
  });

  it('should initialize variables', () => {
    expect(component.eventoToken).toBe("");
    expect(component.tokenValid).toBe(false);
    expect(component.tokenTouched).toBe(false);
    expect(component.mensajeError).toBe("");
    expect(component.partidas).toEqual([]);
    expect(component.noPartidasMensaje).toBe("No hay partidas disponibles en el evento correspondiente");
  });

  it('should render header', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector("h1").textContent).toContain("Buscar partida individual");
  });

  it('should match form value with eventoToken value', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector("input").textContent).toEqual(component.eventoToken)
  });

  it('should NOT call getPartidas', async () => {
    eventoServiceMock.getEvento = jest.fn().mockReturnValue({})
    partidaServiceMock.getPartidas = jest.fn().mockReturnValue(of(true))
    await component.searchEventos()
    expect(partidaServiceMock.getPartidas).not.toHaveBeenCalled()
  });

  it('should call getPartidas', async () => {
    eventoServiceMock.getEvento = jest.fn().mockReturnValue(of(true));
    component.evento = component.evento || definedEvent
    partidaServiceMock.getPartidas = jest.fn().mockReturnValue(of(true))
    await component.searchEventos()
    expect(component.partidaHttpService.getPartidas).toHaveBeenCalled()
    expect(component.mensajeError).toEqual("");
  });

  it('should undefine evento', async () => {
    await component.searchEventos()
    expect(component.evento).toBeUndefined()
  });

  it('should run #entrarAPartida()', async () => {
    let partida:Partida = new Partida();
    component.entrarAPartida(partida);

  });

});

/*it('should catch exception in getPartidas', async () => {
    eventoServiceMock.getEvento = jest.fn().mockReturnValue(of(true));
    component.evento = component.evento || definedEvent
    partidaServiceMock.getPartidas = jest.fn().mockReturnValue({})
    await component.searchEventos()
    expect(component.mensajeError).not.toBe("")
  });*/
