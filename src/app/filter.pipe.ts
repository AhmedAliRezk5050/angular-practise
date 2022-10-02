import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(item: any, filterBy: string, filterValue: string) {
    if(item.length  === 0 || filterValue === '') return item;

    const resultArray = [];
    for (let f of item) {
        if(f[filterBy] === filterValue) {
          resultArray.push(f);
        }
    }

    return resultArray
  }

}
