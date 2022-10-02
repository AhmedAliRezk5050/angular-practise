import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit?: number){
    return limit != undefined && value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
