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

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.userForm?.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit() {
    console.log(this.userForm)
  }
}
