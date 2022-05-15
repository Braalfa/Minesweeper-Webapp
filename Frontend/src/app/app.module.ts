import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CrearPartidaComponent } from './crear-partida/crear-partida.component';
import { ColocarNavesComponent } from './colocar-naves/colocar-naves.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ReturnModalComponent } from './return-modal/return-modal.component';
import { HttpClientModule } from "@angular/common/http";
import { BuscarPartidaComponent } from './buscar-partida/buscar-partida.component';
import { JugarPartidaComponent } from './jugar-partida/jugar-partida.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CrearPartidaComponent,
    ColocarNavesComponent,
    PerfilComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    ReturnModalComponent,
    BuscarPartidaComponent,
    JugarPartidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
