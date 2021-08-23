import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesHttpService } from './services/heroes-http.service';
import { HttpClientModule } from '@angular/common/http';
import { HeroesComponent } from './pages/heroes/heroes.component'
import { FormsModule } from '@angular/forms';
import { HeroeDetalleComponent } from './heroe-detalle/heroe-detalle.component';
import { HeroeService } from './services/heroe.service';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { AppRoutingModule } from './app-routing.module';
import { PanelComponent } from './pages/panel/panel.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeDetalleComponent,
    MensajesComponent,
    PanelComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [HeroesHttpService,HeroeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
