import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { ColocarNavesService } from '../http-services/colocar-naves.service';
import { EventoHttpService } from '../http-services/evento-http.service';
import { PartidaHttpService } from '../http-services/partida-http.service';
import { Evento } from '../models/Evento';
import { Nave } from '../models/Nave';
import { Partida } from '../models/Partida';
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
    ancho: undefined,
    correo: undefined,
    dificultad: undefined,
    identificador: undefined
  }

  rutaSalir: string = ''
  mensajeError: string = ""
  headerTerminarPartida: string = 'Terminó la partida'
  mensajeExitoTerminar: string = ""

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

  mensajeEstadisticas:string = ""
  mensajeGanadas:string = ""
  mensajePerdidas:string = ""

  @ViewChild('cd', { static: false }) countdown!: CountdownComponent;


  constructor(private jugarPartidaDataService: JugarPartidaDataService) {
    jugarPartidaDataService.correoElectronicoActual.subscribe(correo => this.partida.correo = correo)
    jugarPartidaDataService.identificadorActual.subscribe(identificador => this.partida.identificador = identificador)
    jugarPartidaDataService.alturaActual.subscribe(altura => this.partida.altura = altura)
    jugarPartidaDataService.anchoActual.subscribe(ancho => this.partida.ancho = ancho)
    jugarPartidaDataService.dificultadActual.subscribe(dificultad => this.partida.dificultad = dificultad)
  }


  obtainTablero2D(tablero1D:any, columns:any) {
    let tablero2D = [];
    for(let i=0;i < tablero1D.length;i = i+columns)
      tablero2D.push(tablero1D.slice(i,i+columns));
    return tablero2D;
  }

  ngOnInit(): void {
    this.getPartida()
  }

  async getPartida() {
    try {

    } catch (e: any) {
      this.mensajeError = e.error
      $('#errorModal').modal('show');
    } finally {
    }

    try {
      this.gameGrid! = document.querySelector('.grid-player1')!
      this.height = this.partida.altura!
      this.width = this.partida.ancho!
      this.crearTableros()
    } catch (e: any) {
      this.mensajeError = e.error
      $('#errorModal').modal('show');
    } finally {
      this.addListenerSeleccionCoordenada(this.gameSquares)
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
    let tablero = []
    for(let i = 0; i<this.height*this.width; i++){
      tablero.push(-1)
    }
    this.tablero2D = this.obtainTablero2D(tablero, this.width)
    this.initiateBoardDisplay(this.gameGrid, this.gameSquares)
  }

  initiateBoardDisplay(grid:any, squares:any) {
    for (let i = 0; i < this.tablero2D.length; i++) {
      for (let j = 0; j < this.tablero2D[0].length; j++) {
        const square = document.createElement('div')
        let coordY = i+1;
        let coordX = j+1;
        let area = "grid-area:" +  coordY +" / " +  coordX +" / " +  coordY +" / " +  coordX +" ;";
        square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: hsl(184, 9%, 62%);border: 1px solid hsla(211, 12%, 48%);';
        square.id = coordY.toString() + ',' + coordX.toString()
        grid.appendChild(square)
        squares.push(square)
      }
    }
  }

  updateBoardDisplay(grid:any, squares:any) {
    for (let i = 0; i < this.tablero2D.length; i++) {
      for (let j = 0; j < this.tablero2D[0].length; j++) {
        const square = squares[j+this.width*i]
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

  addListenerSeleccionCoordenada(squares: any){
    squares.forEach((square:any) => square.addEventListener('click', (e:any) => {
      console.log(e)
      let id, row, col
      this.currentSelectedCord = e.target
      id = this.currentSelectedCord.id
      row = parseInt(id.split(',')[0])-1
      col = parseInt(id.split(',')[1])-1
      console.log(row)
      console.log(col)
      this.tablero2D = [[-1,-2,0,-3,0],[0,0,0,0,0],[0,0,-1,0,1],[1,1,1,0,0],[0,0,0,0,1],[-1,-1,-1,-1,-1]]
      this.updateBoardDisplay(this.gameGrid, this.gameSquares)
      this.terminarPartida()
    }))
    squares.forEach((square:any) => square.addEventListener('contextmenu', (e:any) => {
      e.preventDefault();
      console.log(e)
      let id, row, col
      this.currentSelectedCord = e.target
      id = this.currentSelectedCord.id
      row = parseInt(id.split(',')[0])-1
      col = parseInt(id.split(',')[1])-1
      console.log(row)
      console.log(col)
      this.tablero2D[row][col] = this.tablero2D[row][col]==-1? -2: this.tablero2D[row][col]
      this.updateBoardDisplay(this.gameGrid, this.gameSquares)
    }))
  }

  terminarPartida(){
    this.mensajeExitoTerminar = "¡Partida Terminada!"
    $('#successModal').modal('show');
  }
}
