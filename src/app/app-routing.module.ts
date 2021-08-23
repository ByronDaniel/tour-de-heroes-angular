import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeDetalleComponent } from './heroe-detalle/heroe-detalle.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { PanelComponent } from './pages/panel/panel.component';

const rutas : Routes = [
  { path: '', redirectTo:'/panel', pathMatch:'full'},
  { path:'heroes', component: HeroesComponent },
  { path:'panel', component: PanelComponent },
  { path: 'detalle/:id', component: HeroeDetalleComponent}

]; 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(rutas)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
