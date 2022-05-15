import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColocarNavesComponent } from './colocar-naves/colocar-naves.component';
import { CrearPartidaComponent } from './crear-partida/crear-partida.component';
import { MainComponent } from './main/main.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BuscarPartidaComponent } from "./buscar-partida/buscar-partida.component";
import { JugarPartidaComponent } from './jugar-partida/jugar-partida.component';

const routes: Routes = [
  {path: '', component: MainComponent,
  children: [
    {path: 'crear-partida', component: CrearPartidaComponent},
    {path: 'colocar-naves', component: ColocarNavesComponent},
    {path: 'buscar-partida', component: BuscarPartidaComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'jugar-partida', component: JugarPartidaComponent}
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
