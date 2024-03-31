import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortener',
})
export class ShortenerPipe implements PipeTransform {
  /**
   * Encurta string
   * @param value
   * @returns
   */
  transform(value: string): string {
    return value.substring(0, 5);
  }
}
