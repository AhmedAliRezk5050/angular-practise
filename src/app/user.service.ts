import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export default class UserService {
  userEventEmitter = new EventEmitter<boolean>()
}
