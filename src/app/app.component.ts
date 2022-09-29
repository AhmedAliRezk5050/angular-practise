import {Component, OnDestroy, OnInit} from '@angular/core';
import UserService from "./user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isActivated = false
  obs?: Subscription
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.obs = this.userService.userEventEmitter.subscribe(data => {
      this.isActivated = data
    })
  }

  ngOnDestroy(): void {
    this.obs?.unsubscribe();
  }
}
