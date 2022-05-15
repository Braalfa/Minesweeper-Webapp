import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-modal',
  templateUrl: './return-modal.component.html',
  styleUrls: ['./return-modal.component.css']
})
export class ReturnModalComponent implements OnInit {

  @Input() ruta: string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
