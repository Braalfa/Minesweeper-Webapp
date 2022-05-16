import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPartidaComponent } from './crear-partida/crear-partida.component';
import { MainComponent } from './main/main.component';
import { JugarPartidaComponent } from './jugar-partida/jugar-partida.component';

const routes: Routes = [
  {path: '', component: MainComponent,
  children: [
    {path: '', component: CrearPartidaComponent},
    {path: 'jugar-partida', component: JugarPartidaComponent}
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
