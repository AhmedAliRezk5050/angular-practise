import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female']
  forbiddenNames = ['ahmed', 'Ali']

  userForm!: FormGroup

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenUsernamesValidator]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsAsyncValidator),
      }),
      'gender': new FormControl('male', Validators.required),
      'age': new FormControl(null, Validators.required),
      'hobbies': new FormArray([])
    });

    this.userForm.statusChanges.subscribe(status => console.log(status));
    this.userForm.valueChanges.subscribe(value => console.log(value));
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

  forbiddenUsernamesValidator: ValidatorFn = (control: AbstractControl) => {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmailsAsyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
    return new Promise<ValidationErrors | null>((res, rej) => {
      setTimeout(() => {
        if (control.value !== 'test@test.com') {
          res({emailIsForbidden: true});
        } else {
          res(null);
        }
      }, 3000);
    });
  }

  get formControls() {
    return this.userForm.controls
  }

  get userData() {
    return this.formControls['userData'] as FormGroup
  }
}

