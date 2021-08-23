import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroeService } from '../services/heroe.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroe-detalle',
  templateUrl: './heroe-detalle.component.html',
  styleUrls: ['./heroe-detalle.component.css']
})
export class HeroeDetalleComponent implements OnInit {
  heroe : Heroe;
  constructor(
    private route: ActivatedRoute,
    private heroeService : HeroeService,
    private location : Location
    ) { }

  ngOnInit(): void {
    this.getHeroe();
  }
  getHeroe():void{
    const id = +this.route.snapshot.paramMap.get('id')! ;
    this.heroeService.getHeroe(id)
      .subscribe((heroe:any) => this.heroe = heroe);
  }
  irAtras(){
    this.location.back();
  }
  save(): void {
    this.heroeService.actualizarHeroe(this.heroe)
      .subscribe(() => this.irAtras());
  }
}
