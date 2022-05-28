import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { PartidaHttpService } from '../http-services/partida-http.service';
import { JugarPartidaDataService } from '../services/jugar-partida-data.service';
import {PartidaBuscaminas} from "../models/PartidaBuscaminas";

declare var $: any;

@Component({
  selector: 'app-jugar-partida',
  templateUrl: './jugar-partida.component.html',
  styleUrls: ['./jugar-partida.component.css']
})
export class JugarPartidaComponent implements OnInit {

  partida: PartidaBuscaminas  = {
    altura: undefined,
    anchura: undefined,
    email: undefined,
    dificultad: undefined,
    id: undefined,
    estado: undefined,
    tableroJugador: undefined
  }

  rutaSalir: string = ''
  mensajeError: string = ""
  headerTerminarPartida: string = 'Terminó la partida'
  mensajeTerminar: string = ""

  // Ancho del tablero en pixeles
  gridWidth = 400
  gridHeight: any

  // Lado de los cuadrados en pixeles
  squareSize: any
  gameGrid!: any
  width: number = 0
  height: number = 0
  gameSquares: any[] = []
  tablero2D:number[][] = []

  currentSelectedCord:any

  @ViewChild('cd', { static: false }) countdown!: CountdownComponent;


  constructor(private jugarPartidaDataService: JugarPartidaDataService,
              private partidaHttpService: PartidaHttpService) {
    jugarPartidaDataService.correoElectronicoActual.subscribe(correo => this.partida.email = correo)
    jugarPartidaDataService.identificadorActual.subscribe(identificador => this.partida.id = identificador)
    jugarPartidaDataService.alturaActual.subscribe(altura => this.partida.altura = altura)
    jugarPartidaDataService.anchoActual.subscribe(ancho => this.partida.anchura = ancho)
    jugarPartidaDataService.dificultadActual.subscribe(dificultad => this.partida.dificultad = dificultad)
    jugarPartidaDataService.estadoActual.subscribe(estado => this.partida.estado = estado)
    jugarPartidaDataService.tableroJugadorActual.subscribe(tablero => this.partida.tableroJugador = tablero)
  }


  obtainTablero2D(tablero1D:any) {
    let tablero2D = [];
    for(let i=0;i < tablero1D.length;i = i+this.width)
      tablero2D.push(tablero1D.slice(i,i+this.width));
    return tablero2D;
  }

  ngOnInit(): void {
    this.startPartida()
  }

  async startPartida() {
    try {
      this.gameGrid! = document.querySelector('.grid-player1')!
      this.height = this.partida.altura!
      this.width = this.partida.anchura!
      this.crearTableros()
    } catch (e: any) {
      this.mensajeError = e.error
      $('#errorModal').modal('show');
    } finally {
      this.addListenerSeleccionCoordenada()
    }

  }

  crearTableros(){
    // Se calculan las dimensiones del tablero y los cuadrados
    if(this.width<this.height){
      this.gridHeight = this.gridWidth
      this.gridWidth = this.width*this.gridHeight/this.height
      this.squareSize = (this.gridHeight)/(this.height)
    }else{
      this.gridHeight = this.height*this.gridWidth/this.width
      this.squareSize = (this.gridWidth)/(this.width)
    }
    console.log(this.partida.tableroJugador)
    this.tablero2D = this.obtainTablero2D(this.partida.tableroJugador)
    this.initiateBoardDisplay()
    this.updateBoardDisplay()
  }

  initiateBoardDisplay() {
    for (let i = 0; i < this.tablero2D.length; i++) {
      for (let j = 0; j < this.tablero2D[0].length; j++) {
        const square = document.createElement('div')
        let coordY = i+1;
        let coordX = j+1;
        let area = "grid-area:" +  coordY +" / " +  coordX +" / " +  coordY +" / " +  coordX +" ;";
        square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: hsl(184, 9%, 62%);border: 1px solid hsla(211, 12%, 48%);';
        square.id = coordY.toString() + ',' + coordX.toString()
        this.gameGrid.appendChild(square)
        this.gameSquares.push(square)
      }
    }
  }

  updateBoardDisplay() {
    for (let i = 0; i < this.tablero2D.length; i++) {
      for (let j = 0; j < this.tablero2D[0].length; j++) {
        const square = this.gameSquares[j+this.width*i]
        let coordY = i+1;
        let coordX = j+1;
        let area = "grid-area:" +  coordY +" / " +  coordX +" / " +  coordY +" / " +  coordX +" ;";
        let casilla = this.tablero2D[i][j]
        switch (casilla) {
          case 0:{
            square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: hsl(197, 10%, 87%);border: 1px solid hsla(211, 12%, 48%);font-size:'+this.squareSize/2+'px; cursor: pointer; text-align:center';
            break;
          }
          case -1:{
            square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: hsl(184, 9%, 62%);border: 1px solid hsla(211, 12%, 48%);';
            break;
          }
          case -2:{
            square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: hsl(184, 9%, 62%);background-image: url(assets/flag.png); background-repeat: round; display: block;border: 1px solid hsla(211, 12%, 48%);';
            break;
          }
          case -3:{
            square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: hsl(7, 99%, 70%);background-image: url(assets/mina.png); background-repeat: round; display: block;border: 1px solid hsla(211, 12%, 48%);';
            break;
          }
          default:{
            square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: hsl(197, 10%, 87%);border: 1px solid hsla(211, 12%, 48%);font-size:'+this.squareSize/2+'px; cursor: pointer; text-align:center';
            square.innerText = casilla
            break;
          }
        }
      }
    }
  }

  addListenerSeleccionCoordenada(){
    // Seleccion
    this.gameSquares.forEach((square:any) => square.addEventListener('click', async (e: any) => {
      let id, row, col
      this.currentSelectedCord = e.target
      id = this.currentSelectedCord.id
      row = parseInt(id.split(',')[0]) - 1
      col = parseInt(id.split(',')[1]) - 1
      try {
        if(this.partida.estado!="ganada"&&this.partida.estado!="perdida") {
          this.partida = await this.partidaHttpService.realizarMovimiento(row, col, this.partida.id!).toPromise()
          this.handleTableroUpdate()
        }
      } catch (e) {
        this.mostrarMensajeError()
      }
    }))

    // Seleccion bandera
    this.gameSquares.forEach((square:any) => square.addEventListener('contextmenu', async (e: any) => {
      e.preventDefault();
      let id, row, col
      this.currentSelectedCord = e.target
      id = this.currentSelectedCord.id
      row = parseInt(id.split(',')[0]) - 1
      col = parseInt(id.split(',')[1]) - 1
      if(this.partida.estado!="ganada"&&this.partida.estado!="perdida") {
        try {
          if (this.tablero2D[row][col] == -1) {
            this.partida = await this.partidaHttpService.cambiarEstadoCasilla(row, col, this.partida.id!, -2).toPromise()
            this.handleTableroUpdate()
          }
        } catch (e) {
          this.mostrarMensajeError()
        }
      }
    }))
  }

  handleTableroUpdate(){
    this.tablero2D = this.obtainTablero2D(this.partida.tableroJugador)
    this.updateBoardDisplay()
    if (this.partida.estado == "ganada" || this.partida.estado == "perdida") {
      if(this.partida.estado=="ganada"){
        this.mensajeTerminar = "¡Partida Ganada!"
      }else if(this.partida.estado=="perdida"){
        this.mensajeTerminar = "Partida Perdida"
      }
      setTimeout(this.terminarPartida, 1000);
    }
  }

  terminarPartida(){
    $('#successModal').modal('show');
  }

  mostrarMensajeError(){
    this.mensajeError = "Error de comunicación con el servidor";
    $('#errorModal').modal('show');
  }
}
