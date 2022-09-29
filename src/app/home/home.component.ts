import {Component, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";

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
        if(count > 2) {
          observer.complete()
        }

        if (count > 3) {
          observer.error(new Error("count > 3"));
        }
        count++;
      }, 1000)
    }));

    this.sub = obs.subscribe(
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
