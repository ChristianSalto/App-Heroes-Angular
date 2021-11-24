import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    const path = 'assets/heroes/';
    const { id } = heroe;

    return `${path + id}.jpg`;
  }
}
