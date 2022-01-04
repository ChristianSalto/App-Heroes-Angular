import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    const path = 'assets/heroes/';
    const { id, alt_img } = heroe;

    if(alt_img === ""){
      return `${path + "no-image"}.png`;
    }

    return `${path + id}.jpg`;
  }
}
