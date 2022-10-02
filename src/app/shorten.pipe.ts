import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any){
    return value.length > 7 ? value.substring(0, 7) + '...' : value;
  }

}
