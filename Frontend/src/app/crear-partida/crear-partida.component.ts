import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '../models/Evento';
import {EventoHttpService} from "../http-services/evento-http.service";
import {CrearPartidaDataService} from "../services/crear-partida-data.service";
import { NumeroJugador } from '../colocar-naves/numeroJugador';
import {PartidaBuscaminas} from "../models/PartidaBuscaminas";
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
              public crearPartidaDataService: CrearPartidaDataService) { }

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

  continuar () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation');
    let form = Array.prototype.slice.call(forms)[0]
    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    }else{
      if(true){
        this.mensajeError = "F";
        $('#errorModal').modal('show');
      }
      this.router.navigate(['/jugar-partida']);
    }
  }



  irAColocarNaves(){

  }

}
