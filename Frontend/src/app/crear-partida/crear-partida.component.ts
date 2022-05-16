import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EventoHttpService} from "../http-services/evento-http.service";
import {PartidaBuscaminas} from "../models/PartidaBuscaminas";
import {JugarPartidaDataService} from "../services/jugar-partida-data.service";
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
  partida: PartidaBuscaminas = {identificador: undefined,   altura: 10,  ancho: 10, dificultad: "medio", correo: ""}
  //Modals
  rutaSalir: string = '/'
  mensajeError: string = ""
  constructor(public router: Router,
              public crearPartidaService: EventoHttpService,
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

  continuar () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation');
    let form = Array.prototype.slice.call(forms)[0]
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    }else{
      if(false){
        this.mensajeError = "F";
        $('#errorModal').modal('show');
      }
      this.jugarPartidaDataService.cambiarIdentificador(this.partida.identificador!)
      this.jugarPartidaDataService.cambiarCorreo(this.partida.correo!)
      this.jugarPartidaDataService.cambiarAncho(this.partida.ancho!)
      this.jugarPartidaDataService.cambiarAltura(this.partida.altura!)
      this.jugarPartidaDataService.cambiarDificultad(this.partida.dificultad!)

      this.router.navigate(['/jugar-partida']);
    }
  }

}
