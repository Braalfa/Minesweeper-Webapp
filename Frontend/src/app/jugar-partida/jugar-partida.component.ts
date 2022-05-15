import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { StringIdGenerator } from '../clases/StringIdGenerator';
import { ColocarNavesService } from '../http-services/colocar-naves.service';
import { EventoHttpService } from '../http-services/evento-http.service';
import { PartidaHttpService } from '../http-services/partida-http.service';
import { Evento } from '../models/Evento';
import { Nave } from '../models/Nave';
import { Partida } from '../models/Partida';
import { PartidaNave } from '../models/PartidaNave';
import { Registro } from '../models/Registro';
import { JugarPartidaService } from '../services/jugar-partida.service';

declare var $: any;

@Component({
  selector: 'app-jugar-partida',
  templateUrl: './jugar-partida.component.html',
  styleUrls: ['./jugar-partida.component.css']
})
export class JugarPartidaComponent implements OnInit {

  partida:Partida | undefined
  evento: Evento | undefined
  //
  rutaSalir: string = '/buscar-partida'
  mensajeError: string = ""
  headerTerminarPartida: string = 'Terminó la partida'
  mensajeExitoTerminar: string = ""

  // Ancho del tablero en pixeles
  gridWidth = 400
  gridHeight: any
  // Lado de los cuadrados en pixeles
  squareSize: any
  gameGrid!: any
  player2Grid!: any
  width: number = 0
  height: number = 0
  gameSquares: any[] = []
  player2Squares: any[] = []
  shipArray: Nave[]= []
  jugador1Real: string  = 'Jugador2'

  turno = ''
  idPartida = 1

  canShoot = false
  currentSelectedCord:any

  registers:any = []

  mensajeEstadisticas:string = ""
  mensajeGanadas:string = ""
  mensajePerdidas:string = ""

  @ViewChild('cd', { static: false }) countdown!: CountdownComponent;


  constructor(public partidaHttpService: PartidaHttpService, public eventoHttpService: EventoHttpService,
    private jugarPartidaService: JugarPartidaService) {
      //jugarPartidaService.codigoEventoActual.subscribe(codigo=> {this.codigoEvento = codigo; console.log(codigo)})
      //jugarPartidaService.idPartidaActual.subscribe(idPartida=> {this.idPartida = idPartida; console.log(this.idPartida)})
      //jugarPartidaService.jugadorActual.subscribe(jugador1Real=> {this.jugador1Real = jugador1Real;console.log(jugador1Real)})
    }

  ngOnInit(): void {
    this.getPartida()
  }

  async getPartida() {
    try {

    } catch (e: any) {
      this.partida = undefined
      this.mensajeError = e.error
      $('#errorModal').modal('show');
    } finally {
    }

    try {
      this.gameGrid! = document.querySelector('.grid-player1')!
      this.height = 5
      this.width = 5
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
    let tablero = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    this.displayBoard(this.gameGrid, this.gameSquares,  tablero)
  }

  displayBoard(grid:any, squares:any, tablerodisparos: any[]) {
    let tablerodisparos2D = this.obtainTablero2D(tablerodisparos, this.width)
    for (let i = 0; i < tablerodisparos2D.length; i++) {
      for (let j = 0; j < tablerodisparos2D[0].length; j++) {
        const square = document.createElement('div')
        let coordY = i+1;
        let coordX = j+1;
        let area = "grid-area:" +  coordY +" / " +  coordX +" / " +  coordY +" / " +  coordX +" ;";
        let casilla = tablerodisparos2D[i][j]
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
        square.id = coordY.toString() + ',' + coordX.toString()
        grid.appendChild(square)
        squares.push(square)
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
      let newTablero = [-1,-2,0,-3,0,0,0,0,0,0,0,0,-1,0,1,1,1,1,0,0,0,0,0,0,1]
      this.displayBoard(this.gameGrid, this.gameSquares, newTablero)
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
      let newTablero = [-1,1,0,0,0,0,0,0,0,0,0,0,-1,0,1,1,1,1,0,0,0,0,0,0,1]
      this.displayBoard(this.gameGrid, this.gameSquares, newTablero)
    }))

  }

  markShots(){
    this.markShotsAux(this.gameGrid, this.partida!.tablerodisparos1, this.gameSquares)
  }

  markShotsAux(grid:any, tableroDisparos: any[], squares: any[]) {
    let tablero2D = this.obtainTablero2D(tableroDisparos, this.width);
    for (let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++){
        const square = squares[(j-1)*this.width+(i-1)]
        let realCoordY = j+1;
        let realCoordX = i+1;
        let area = "grid-area:" +  realCoordY +" / " +  realCoordX +" / " +  realCoordY +" / " +  realCoordX +" ;";
        if(tablero2D[j-1][i-1]==1 ){
          square.style.cssText = area+'width:100%;height:100%;background-color: hsl(27, 100%, 46%);border: 1px solid hsla(0, 0%, 100%, .2)';
          square.classList.add("shot");
        }
        if(tablero2D[j-1][i-1]==2) {
          square.style.cssText = area+'width:100%;height:100%;background-color: hsla(0, 90%, 50%, 1);border: 2px solid hsla(0, 0%, 100%, .2)';
          square.classList.add("shot");
        }
      }
    }
  }

  obtainTablero2D(tablero1D:any, columns:any) {
    let tablero2D = [];
    for(let i=0;i < tablero1D.length;i = i+columns)
    tablero2D.push(tablero1D.slice(i,i+columns));
    return tablero2D;
  }

  terminarPartida(){
    if (this.partida?.estado == 'Terminada'){
      this.mensajeExitoTerminar = "¡Victoria para " + this.turno + "!"
      if(this.jugador1Real == this.turno){
        this.mensajeGanadas = "Partidas Ganadas: 1"
        this.mensajePerdidas = "Partidas Perdidas: 0"
      }else{
        this.mensajeGanadas = "Partidas Ganadas: 0"
        this.mensajePerdidas = "Partidas Perdidas: 1"
      }
      $('#successModal').modal('show');
    }
  }
}
