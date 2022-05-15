import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {

  @Input() headerExito=''
  @Input() mensajeExito=''
  @Input() ruta=''

  constructor() { }

  ngOnInit(): void {
  }

}
