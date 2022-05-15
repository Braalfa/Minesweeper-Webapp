import { Component, OnInit } from '@angular/core';
import {Evento} from "../models/Evento";
import {Partida} from "../models/Partida";
import {EventoHttpService} from "../http-services/evento-http.service";
import { PartidaHttpService } from '../http-services/partida-http.service';
import { CrearPartidaDataService } from '../services/crear-partida-data.service';
import { NumeroJugador } from '../colocar-naves/numeroJugador';
import { Router, RouterOutlet } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-buscar-partida',
  templateUrl: './buscar-partida.component.html',
  styleUrls: ['./buscar-partida.component.css']
})
export class BuscarPartidaComponent implements OnInit {

  eventoToken:string = ""
  tokenValid:boolean = false
  tokenTouched:boolean = false
  mensajeError:string = ""
  evento:Evento|undefined
  partidas: Partida[] = []
  noPartidasMensaje = "No hay partidas disponibles en el evento correspondiente"

  constructor(public eventoHttpService: EventoHttpService, public partidaHttpService: PartidaHttpService,
              public crearPartidaDataService: CrearPartidaDataService, public router: Router) { }

  ngOnInit(): void {
  }

  async searchEventos(){
    try {
      this.evento = await this.eventoHttpService.getEvento(this.eventoToken).toPromise()
      this.tokenValid = true
    }catch (e) {
      this.tokenValid = false
      this.partidas = []
      this.evento = undefined
    }finally {
      this.tokenTouched = true
    }

    if(this.evento){
      try{
        this.partidas = await this.partidaHttpService.getPartidas(this.evento.codigo!).toPromise()
        if(this.partidas.length === 0){
          this.mensajeError = this.noPartidasMensaje
          $('#errorModal').modal('show');
        }
      }catch(e:any){
        this.mensajeError = e.error
        $('#errorModal').modal('show');
      }
    }
  }

  entrarAPartida (partida: Partida) {
      this.crearPartidaDataService.cambiarCodigoEvento(this.evento?.codigo!)
      this.crearPartidaDataService.cambiarColumnas(this.evento?.tablerocolumnas!)
      this.crearPartidaDataService.cambiarFilas(this.evento?.tablerofilas!)
      this.crearPartidaDataService.cambiarNumeroJugador(NumeroJugador.jugador2)
      this.crearPartidaDataService.cambiarUsernameJugador('Jugador2')
      this.crearPartidaDataService.cambiarNumeroNaves(this.evento?.numeronaves!)
      this.crearPartidaDataService.cambiarPartida(partida)
      this.crearPartidaDataService.cambiarTokenEvento(this.evento?.llave!)
      this.router.navigate(['/colocar-naves']);
  }
}
