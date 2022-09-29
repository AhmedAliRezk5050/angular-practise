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
        count++;
      }, 1000)
    }));

    this.sub = obs.subscribe(data => console.log(data))
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

}
