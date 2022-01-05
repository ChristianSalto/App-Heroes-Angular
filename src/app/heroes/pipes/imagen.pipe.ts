import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: true,
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    const path = 'assets/heroes/';
    const { id, alt_img } = heroe;

    if (alt_img === '') {
      return `${path + 'no-image'}.png`;
    } else if (alt_img) {
      return alt_img;
    } else {
      return `${path + id}.jpg`;
    }
  }
}
