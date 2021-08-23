import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/models/hero';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  heroes: Heroe[];
  constructor(
    private heroeService : HeroeService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(){
    this.heroeService.getHeroes().subscribe(
      res => {
        this.heroes = res.slice(1,5);
      }
    );
  }
}
