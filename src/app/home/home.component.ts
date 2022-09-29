import {Component, OnInit} from '@angular/core';

import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private sub?: Subscription

  constructor() {
  }

  ngOnInit() {
    const obs = new Observable(((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count > 3) {
          observer.error(new Error("count > 3"));
        }

        if (count > 20) {
          observer.complete()
        }
        count++;
      }, 1000)
    }));

    this.sub = obs.pipe(map((data) => 'Round: ' + (data as number + 1))).subscribe(
      {
        next: data => console.log(data),
        error: error => console.log(error.message),
        complete: () => console.log('completed')
      })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

}
