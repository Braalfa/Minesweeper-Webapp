import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PartidaBuscaminas} from "../models/PartidaBuscaminas";
import {JugarPartidaDataService} from "../services/jugar-partida-data.service";
import {PartidaHttpService} from "../http-services/partida-http.service";
declare var $: any;

@Component({
  selector: 'app-crear-partida',
  templateUrl: './crear-partida.component.html',
  styleUrls: ['./crear-partida.component.css']
})
export class CrearPartidaComponent implements OnInit {

  seleccionDeTipoPartida = false
  nuevaPartida = false

  dificultades = ["facil", "medio", "dificil", "profesional"]
  partida: PartidaBuscaminas = {id: undefined,   altura: 10,  anchura: 10, dificultad: "medio", email: "", estado:undefined, tableroJugador:undefined}
  //Modals
  rutaSalir: string = '/'
  mensajeError: string = ""
  constructor(public router: Router,
              public partidaHttpService: PartidaHttpService,
              public jugarPartidaDataService: JugarPartidaDataService) { }

  ngOnInit(): void {
  }

  seleccionarNuevaPartida(){
    this.seleccionDeTipoPartida = true
    this.nuevaPartida = true
  }

  seleccionContinuarPartida(){
    this.seleccionDeTipoPartida = true
    this.nuevaPartida = false
  }

  reset(){
    this.seleccionDeTipoPartida = false
  }

  async continuar () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation');
    let form = Array.prototype.slice.call(forms)[0]
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    }else{
      if(this.nuevaPartida){
        this.crearNuevaPartida()
      }else{
        this.continuarPartida()
      }
    }
  }

  async crearNuevaPartida(){
    try{
      this.partida = await this.partidaHttpService.crearPartida(this.partida).toPromise()
      this.compartirDatosDePartida()
      this.router.navigate(['/jugar-partida']);
    }catch (error:any){
      this.mostrarMensajeError()
    }
  }

  async continuarPartida(){
    try {
      this.partida = await this.partidaHttpService.getPartida(this.partida.email).toPromise()
      if(this.partida.id != -1){
        this.compartirDatosDePartida()
        this.router.navigate(['/jugar-partida']);
      }else{
        this.mensajeError = "No existe una partida activa asociada al correo indicado";
        $('#errorModal').modal('show');
      }
    }catch (e:any){
      this.mostrarMensajeError()
    }
  }

  compartirDatosDePartida(){
    this.jugarPartidaDataService.cambiarCorreo(this.partida.email!)
    this.jugarPartidaDataService.cambiarAncho(this.partida.anchura!)
    this.jugarPartidaDataService.cambiarAltura(this.partida.altura!)
    this.jugarPartidaDataService.cambiarDificultad(this.partida.dificultad!)
    this.jugarPartidaDataService.cambiarEstado(this.partida.estado!)
    this.jugarPartidaDataService.cambiarIdentificador(this.partida.id!)
    this.jugarPartidaDataService.cambiarTableroJugador(this.partida.tableroJugador!)
  }

  mostrarMensajeError(){
    this.mensajeError = "Error de comunicación con el servidor";
    $('#errorModal').modal('show');
  }

}
