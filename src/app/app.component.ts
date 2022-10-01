import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female']

  userForm!: FormGroup

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    })
  }

  onSubmit() {
    console.log(this.userForm);
  }

  onAddFormControl() {
    const control = new FormControl(null, Validators.required);
    (this.userForm.get('hobbies') as FormArray).push(control);
  }

  get hobbiesFormArray() {
    return (this.userForm.get('hobbies') as FormArray)
  }

}

