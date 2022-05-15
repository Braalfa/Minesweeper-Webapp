import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StringIdGenerator } from '../clases/StringIdGenerator';
import { Nave } from '../models/Nave';
import { PartidaNave } from '../models/PartidaNave';
import {ColocarNavesService} from "../http-services/colocar-naves.service";
import {Partida} from "../models/Partida";
import {CrearPartidaDataService} from "../services/crear-partida-data.service";
import { NumeroJugador } from './numeroJugador';
import { JugarPartidaService } from '../services/jugar-partida.service';
declare var $: any;

@Component({
  selector: 'app-colocar-naves',
  templateUrl: './colocar-naves.component.html',
  styleUrls: ['./colocar-naves.component.css']
})
export class ColocarNavesComponent implements OnInit {

  // Ancho del tablero en pixeles
  gridWidth = 400
  gripHeight: any
  // Lado de los cuadrados en pixeles
  squareSize: any
  userGrid!: any
  displayGrid: any
  ships!: any
  placed_ships!: any
  rotateButton: any
  userSquares: any[] = []
  width: number = 0
  height: number = 0
  allShipsPlaced: any
  draggedShip: any
  seleccionadaParaEliminar: boolean = false
  navePorEliminar:any
  shipArray: Nave[]= []
  tablero:any[][] = [];
  tablero1D:any[] = [];
  infoNaves: PartidaNave[] = []
  codigoEvento: string =  ""
  dragOffsetX = 0
  dragOffsetY = 0
  //Modals
  rutaSalir: string = '/crear-partida'
  mensajeError: string = ""
  numeroNaves: number = 0
  jugador = '';
  numeroJugador: NumeroJugador = NumeroJugador.jugador1;
  partida: Partida = <Partida>{};
  mensajeBotonCrear: string = ""

  putHelp = "block"
  removeHelp = "none"
  haRetornado = false;
  token = ""
  constructor(public router: Router,public colocarNavesService: ColocarNavesService,
              public crearPartidaDataService: CrearPartidaDataService, public jugarPartidaService: JugarPartidaService) {
    this.crearPartidaDataService.codigoEventoActual.subscribe(codigo => this.codigoEvento = codigo)
    this.crearPartidaDataService.numeroNavesActual.subscribe(numeroNaves => this.numeroNaves = numeroNaves)
    this.crearPartidaDataService.tableroColumnasActual.subscribe(ncol=> this.width = ncol)
    this.crearPartidaDataService.tableroFilasActual.subscribe(nfil=> this.height = nfil)
    this.crearPartidaDataService.usernameJugadorActual.subscribe(j=> this.jugador = j)
    this.crearPartidaDataService.numeroJugadorActual.subscribe(nj=> this.numeroJugador = nj)
    this.crearPartidaDataService.partidaActual.subscribe(p=> this.partida = p)
    this.crearPartidaDataService.tokenEventoActual.subscribe(p=> this.token = p)
    if(this.numeroJugador === NumeroJugador.jugador1){
      this.mensajeBotonCrear = "Crear Partida"
    }else{
      this.mensajeBotonCrear = "Ingresar a Partida"
    }
  }

  ngOnInit(): void {
    this.userGrid = document.querySelector('.grid-user')!
    this.displayGrid = document.querySelector('#display-grid')
    this.ships = document.querySelectorAll('.ship')!
    this.rotateButton = document.querySelector('#rotate')
    this.userSquares = []
    this.allShipsPlaced = false
    this.tablero = Array.from(Array(this.height), (_: any) => Array(this.width).fill(0))

    // Se obtienen las naves
    this.colocarNavesService.getNaves(this.codigoEvento).subscribe(response =>{
      let counter = 1
      if(this.numeroJugador === NumeroJugador.jugador2){
        counter = this.numeroNaves+1
      }
      for(let j = 0; j<response.length; j++){
        let nc = response[j]
        for(let i = 0; i<nc.item1.cantidad; i++){
          let shipCopy = JSON.parse(JSON.stringify(nc.item2))
          shipCopy.identificador = counter
          shipCopy.disponible = true
          shipCopy.naveid = nc.item1.nave
          this.shipArray.push(shipCopy)
          counter++
        }
      }
    }, error => {
      this.shipArray = []
      //console.log(error)
    })

    // Se calculan las dimensiones del tablero y los cuadrados
    if(this.width<this.height){
      this.gripHeight = this.gridWidth
      this.gridWidth = this.width*this.gripHeight/this.height
      this.squareSize = (this.gripHeight+1)/(this.height+1)
    }else{
      this.gripHeight = this.height*this.gridWidth/this.width
      this.squareSize = (this.gridWidth+1)/(this.width+1)
    }

    this.createBoard(this.userGrid, this.userSquares)

    //console.log(this.squareSize)
    this.initializeEvents()

  }

  initializeEvents(){
    //Para mover las naves
    this.userSquares.forEach(square => square.addEventListener('dragstart', (e:any) => this.dragStart(e)))
    this.userSquares.forEach(square => square.addEventListener('dragover', (e:any) => this.dragOver(e)))
    this.userSquares.forEach(square => square.addEventListener('dragenter', (e:any) => this.dragEnter(e)))
    this.userSquares.forEach(square => square.addEventListener('dragleave', (e:any) => this.dragLeave(e)))
    this.userSquares.forEach(square => square.addEventListener('drop', (e:any) => this.dragDrop(e)))
    this.userSquares.forEach(square => square.addEventListener('dragend', (e:any) => this.dragEnd(e)))
  }


  createBoard(grid:any, squares:any) {
    let letter_id = new StringIdGenerator();

    //+1 por el ajuste del letras y números de coordenadas
    for (let i = 1; i <= this.width+1; i++) {
      for(let j = 1; j <= this.height+1; j++){
        const square = document.createElement('div')
        let area = "grid-area:" +  j +" / " +  i +" / " +  j +" / " +  i +" ;";
        square.style.cssText = area+'width:'+this.squareSize+'px;height:'+this.squareSize+'px;background-color: rgb(255, 255, 255); font-size:'+this.squareSize/2+'px;cursor: pointer; text-align:center;'
        let realCoordY = j-1;
        let realCoordX = i-1;

        if(i == 1 && j == 1){
          grid.appendChild(square)

        }else if(i == 1){
          square.innerText = letter_id.next()
          grid.appendChild(square)

        }else if(j == 1){
          square.innerText = realCoordX.toString()
          grid.appendChild(square)
        }
        else{
          square.style.cssText = area+'width:100%;height:100%;background-color: hsl(200, 100%, 70%);border: 1px solid hsla(0, 0%, 100%, .2)';
          //square.style.cssText = 'width:8vmin;height:8vmin';
          //square.dataset.id = letter_id.next() + ',' + i.toString()   <-- Da coordenada A,1
          square.id = realCoordY.toString() + ',' + realCoordX.toString()
          grid.appendChild(square)
          squares.push(square)
        }

      }
      letter_id = new StringIdGenerator();

    }
  }

  dragStart(e: any) {
    this.draggedShip = e.target
    this.dragOffsetX = e.offsetX
    this.dragOffsetY = e.offsetY

    //console.log(this.draggedShip)
  }

  dragOver(e: any) {
    e.preventDefault()
  }

  dragEnter(e: any) {
    e.preventDefault()
  }

  dragLeave(e: any) {
    // console.log('drag leave')
  }

  dragDrop(e: any) {

    'use strict';
    let cuadroDrop = e.target.id
    let columnasOffset = Math.round((this.dragOffsetX-e.offsetX)/this.squareSize)
    let filasOffset =Math.round( (this.dragOffsetY-e.offsetY)/this.squareSize)
    //console.log(this.draggedShip.id)
    let cuadroDropColumna = parseInt(cuadroDrop.split(',').pop())+1-columnasOffset;
    let cuadroDropFila = parseInt(cuadroDrop.substr(0, cuadroDrop.indexOf(',')))+1-filasOffset;
    let nave = this.shipArray.find(e => e.identificador == this.draggedShip.id)

    let maxX = cuadroDropColumna + nave!.largo!   //Columna donde se va a dropear + largo de la nave
    let maxY = cuadroDropFila + nave!.ancho!      //Fila donde se va a dropear + ancho de la nave
    //console.log("fila: "+ cuadroDropFila + ", col: "+ cuadroDropColumna)

    if(maxX > this.width+2 || maxY > this.height+2){     //Verificar límites
      this.mensajeError = "La nave sobrepasa los límites del tablero"
      $('#errorModal').modal('show');

    }else if (this.checkOverlap(cuadroDropFila, maxY, cuadroDropColumna, maxX, nave?.identificador)){
      this.mensajeError = "Las naves no pueden ser colocadas unas sobre otras"
      $('#errorModal').modal('show');
    }

    else{
      const container = document.createElement('div')
      //Min y  /  Min x    / Max y (excluido) / Max x (excluido)
      let area = "grid-area:" +  cuadroDropFila  +" / " +  cuadroDropColumna +" / " +  maxY +" / " +  maxX +" ;";
      container.style.cssText = area+'background-image: url(\''+nave?.icono+'\'); background-repeat: round;width:100%;height:100%; display: block;';
      container.classList.add('placed-ship')
      container.id = nave!.identificador!.toString()
      this.userGrid.appendChild(container)

      //Actualizar matriz del tablero
      this.actualizarMatrizTablero(cuadroDropFila, maxY, cuadroDropColumna, maxX, nave?.identificador)

      //Obtener los que ya se pusieron
      this.placed_ships = document.querySelectorAll('.placed-ship')!
      //Configurarles el click
      this.placed_ships.forEach((ship: any) => ship.addEventListener('mousedown', (e:any) => {
      this.seleccionadaParaEliminar = true
      this.navePorEliminar = e.target
      //console.log(this.navePorEliminar)
      }))

      //Quitar la nave del panel de disponibles
      nave!.disponible = false
      this.putHelp = "none";
      if(!this.haRetornado){
        this.removeHelp = "block";
      }
    }

    //Verificar si ya se colocaron todas las naves
    this.checkAllPlaced()
  }

  dragEnd(e: any) {
    // console.log('dragend')
  }

  checkAllPlaced(){
    for (const ship of this.shipArray) {
      if (ship.disponible) {
        this.allShipsPlaced = false
        return
      }
    }
    this.allShipsPlaced = true
    //console.log(this.allShipsPlaced)
  }

  checkOverlap(xInicio:any, xFin:any, yInicio:any, yFin:any, id:any){
    for (let i= xInicio-2; i < xFin-2; i++) {
      for (let j = yInicio-2; j < yFin-2; j++) {
        if (this.tablero[i][j] != 0) {
          return true
        }
      }
    }
    return false
  }

  eliminarNave(){
    let nave = this.shipArray.find(e => e.identificador == this.navePorEliminar.id)
    this.userGrid.removeChild(this.navePorEliminar) //Eliminarla del tablero
    nave!.disponible=true
    this.eliminarNaveMatriz(nave?.identificador)
    this.seleccionadaParaEliminar = false
    this.checkAllPlaced()
    this.haRetornado = true
  }

  eliminarNaveMatriz(idNave: any){
    for (let i=0; i < this.height; i++) {
      for (let j=0; j < this.width; j++) {
        if (this.tablero[i][j] == idNave) {
          this.tablero[i][j] = 0
        }
      }
    }
    //console.log(this.tablero)
  }

  actualizarMatrizTablero(xInicio:any, xFin:any, yInicio:any, yFin:any, id:any){
    for (let i= xInicio-2; i < xFin-2; i++) {
      for (let j = yInicio-2; j < yFin-2; j++) {
        this.tablero[i][j] = id
      }
    }
    //console.log(this.tablero)
  }


  setShipInfo(partidaid: number){
    let alreadyAdded: number | any[] = []
    for (let i=0; i < this.height; i++) {
      for (let j=0; j < this.width; j++) {
        let valorCasilla = this.tablero[i][j]
        if (valorCasilla != 0 && !alreadyAdded.includes(valorCasilla)) {
          let newNave = new PartidaNave()
          newNave.identificador = valorCasilla
          let ship = this.shipArray.find(s=> s.identificador===newNave.identificador)
          //Para que correspondan con el tablero mostrado (+1)
          newNave.posminx = j
          newNave.posminy = i
          newNave.naveid = ship!.naveid
          newNave.jugador = this.jugador
          newNave.estado = 'Ok'
          newNave.partidaid = partidaid
          this.infoNaves.push(newNave)
          alreadyAdded.push(valorCasilla)
        }
      }
    }
    console.log(this.infoNaves)
  }


  async continuar(){
    if(this.numeroJugador === NumeroJugador.jugador1){
      this.crearPartida()
    }else{
      this.ingresarAPartida()
    }
  }

  async crearPartida (){
    let partida:Partida = new Partida()
    partida.evento = this.codigoEvento
    partida.jugador1 = this.jugador
    try {
      console.log(partida)
      partida.tableronaves1 = this.obtainTablero1D()
      partida.tablerodisparos1 = new Array(this.width*this.height).fill(0)
      this.setShipInfo(partida.identificador!)
      partida = await this.colocarNavesService.crearPartida(
        {partida, navesJugador:this.infoNaves}
        ).toPromise()
      $('#crearModal').modal('show');
      this.afterCrearPartida(partida)
    }catch (e:any) {
      if(e.status!==200){
        this.mensajeError = e.error
        console.log(e)
        $('#errorModal').modal('show');
      }else{
        $('#crearModal').modal('show');
        this.afterCrearPartida(partida)
      }
    }
  }


  afterCrearPartida(partida: Partida){
    let httpService = this.colocarNavesService;
    let router = this.router;
    let service = this.jugarPartidaService;
    let token = this.token
    let interval = setInterval(async function(){
      try{
        let partidaActual = await httpService.getPartidaEstado(partida.identificador!).toPromise()
        if(partidaActual.estado === "En Juego"){
          $('#crearModal').modal('dispose');
          service.cambiarCodigoEvento(token)
          service.cambiarJugador("Jugador1")
          service.cambiarIdPartida(partidaActual.identificador!)
          router.navigate(['/jugar-partida']);
          clearInterval(interval);
        }
      }catch(e){
        console.log(e)
      }
    }, 1000);
  }

  /**
   * Todo: Redireccionar hacia el componente de juego
   */

  async ingresarAPartida (){
    this.partida.jugador2 = this.jugador
    try {
      this.partida.tableronaves2 = this.obtainTablero1D()
      this.partida.tablerodisparos2 = new Array(this.width*this.height).fill(0)
      this.setShipInfo(this.partida.identificador!)
      console.log(JSON.stringify({partida:this.partida, navesJugador:this.infoNaves}))
      let response = await this.colocarNavesService.ingresarAPartida(
        {partida:this.partida, navesJugador:this.infoNaves}
        ).toPromise()
    }catch (e:any) {
      if(e.status!==200){
        this.mensajeError = e.error
        console.log(e)
        $('#errorModal').modal('show');
      }else{
        this.jugarPartidaService.cambiarCodigoEvento(this.token)
        this.jugarPartidaService.cambiarJugador("Jugador2")
        this.jugarPartidaService.cambiarIdPartida(this.partida.identificador!)
        this.router.navigate(['/jugar-partida']);
      }
    }
  }

  obtainTablero1D(){
    let tablero1D:any= []
    this.tablero.forEach(row=>row.forEach(e=>tablero1D.push(e)))
    return tablero1D
  }
}
