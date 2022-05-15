import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPartidaComponent } from './crear-partida.component';

import { FormsModule } from '@angular/forms';
import { Evento } from '../models/Evento';
import {EventoHttpService} from "../http-services/evento-http.service";
import {CrearPartidaDataService} from "../services/crear-partida-data.service";
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { ReturnModalComponent } from '../return-modal/return-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, scheduled } from 'rxjs';
import $ from 'jquery';

describe('CrearPartidaComponent', () => {
  let component: CrearPartidaComponent;
  let fixture: ComponentFixture<CrearPartidaComponent>;

  document.body.innerHTML =
  '<form class="row g-3 needs-validation" novalidate>' +
              '<div class="col-md-12">' +
                  '<input [disabled]="this.isTokenValid"  [class.is-invalid]="!this.isTokenValid && tokenVerified"' +
                          '[class.is-valid]="this.isTokenValid && tokenVerified" (input)="tokenVerified = true"' +
                          '[(ngModel)]="this.token" [ngModelOptions]="{standalone: true}" type="text" minlength="6"' +
                      'maxlength="6" class="form-control" id="token" required>' +
                  '<div class="invalid-feedback">' +
                      'Token no válido. Por favor proporcione un token válido.' +
                  '</div>' +
              '</div>' +
              '<br><br>' +
  '</form>';

  require('./crear-partida.component.ts');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ CrearPartidaComponent, ErrorModalComponent, ReturnModalComponent ],
      providers:[CrearPartidaComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // new test by ngentest
  it('should run #ngOnInit()', async () => {

    component.ngOnInit();

  });


  it('should run #submitToken()', async () => {

    component.tokenVerified = true;
    component.checkValidity = true;
    const token = document.getElementById('token');

    component.crearPartidaService = component.crearPartidaService || {};
    component.crearPartidaService.getEvento = jest.fn().mockReturnValue(of({
      codigo: {},
      tablerocolumnas: {},
      tablerofilas: {}
    }));
    component.crearPartidaDataService = component.crearPartidaDataService || {};
    component.crearPartidaDataService.cambiarCodigoEvento = jest.fn();
    component.crearPartidaDataService.cambiarColumnas = jest.fn();
    component.crearPartidaDataService.cambiarFilas = jest.fn();
    component.checkValidity = true;
    component.submitToken();
    // expect(component.crearPartidaService.getEvento).toHaveBeenCalled();
    // expect(component.crearPartidaDataService.cambiarCodigoEvento).toHaveBeenCalled();
    // expect(component.crearPartidaDataService.cambiarColumnas).toHaveBeenCalled();
    // expect(component.crearPartidaDataService.cambiarFilas).toHaveBeenCalled();

  });

  // new test by ngentest
  it('should run #irAColocarNaves()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.irAColocarNaves();
    expect(component.router.navigate).toHaveBeenCalled();
  });
});
