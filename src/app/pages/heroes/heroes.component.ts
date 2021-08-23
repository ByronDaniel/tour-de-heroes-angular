import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/models/hero';
import { HeroeService } from 'src/app/services/heroe.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes : Heroe [];
  heroeSeleccionado: Heroe;
  constructor(
    private heroeService : HeroeService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }
 
  getHeroes(): void{
    this.heroeService.getHeroes().subscribe(
      res => {
        this.heroes = res;
      }
    );
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroeService.agregarHeroe({ nombre:name } as Heroe)
      .subscribe(heroe => {
        this.heroes.push(heroe);
      });
  }
  delete(hero: Heroe): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroeService.deleteHero(hero).subscribe();
  }
}
