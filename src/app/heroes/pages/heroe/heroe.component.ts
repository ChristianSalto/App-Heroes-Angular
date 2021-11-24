import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [],
})
export class HeroeComponent implements OnInit {
  heroe: any = {};

  constructor(
    private rutaActiva: ActivatedRoute,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.rutaActiva.params
      .pipe(
        switchMap(({ id }) => {
          return this.heroesService.getHeroesById(id);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.heroe = res
      });
  }
}
