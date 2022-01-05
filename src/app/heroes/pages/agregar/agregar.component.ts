import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    power: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroesById(id)))
      .subscribe((heroe) => {
        this.heroe = heroe;
      });
  }

  handleSave() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      this.heroesService.putHeroe(this.heroe).subscribe((heroe) => {
        this.handleSnakbar('Registro actualizado');
      });
    } else {
      this.heroesService.postHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.handleSnakbar('Registro creado');
      });
    }
  }

  handleRemove() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHeroe(this.heroe.id!).subscribe((res) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  handleSnakbar(msj: string) {
    this.snackBar.open(msj, 'ok!', {
      duration: 2500,
    });
  }
}
