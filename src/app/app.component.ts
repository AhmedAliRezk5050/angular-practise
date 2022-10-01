import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') userForm?: NgForm

  genders = ['male', 'female']

  answer = '';

  defaultQuestion = "teacher"

  user?:FormData

  submitted = false

  suggestUserName() {
    const suggestedName = 'Superuser';
    /// resets other form value
    // this.userForm?.setValue({
    //   "userData": {
    //     "username": suggestedName,
    //     "email": ""
    //   },
    //   "secret": "",
    //   "reply": "",
    //   "gender": ""
    // });

    this.userForm?.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.user = this.userForm?.value
  }
}

interface UserData {
  username: string;
  email: string;
}

interface FormData {
  userData: UserData;
  secret: string;
  reply: string;
  gender: string;
}
