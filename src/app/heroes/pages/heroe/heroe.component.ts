import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `

    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rutaActiva.params
      .pipe(
        switchMap(({ id }) => {
          return this.heroesService.getHeroesById(id);
        })
      )
      .subscribe((res) => {
        this.heroe = res;
      });
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }
}
