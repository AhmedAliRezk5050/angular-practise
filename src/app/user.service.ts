import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export default class UserService {
  userEventEmitter = new Subject<boolean>()
}
