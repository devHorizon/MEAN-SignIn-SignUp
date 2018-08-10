import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { User } from '../shared/user';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  user: any = {};
  ans: any;
  val: any;
  msg: String;
  showErr: String;


  userForm: FormGroup;
  formErrors = {
    'name': '',
    '_id': '',
    'password': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    },
    '_id': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private userservice: UserServiceService) {

    this.createForm();
  }


  createForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      _id: ['', [Validators.required, Validators.email]]
    });


    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  ngOnInit() {
  }

  onSubmit() {

    this.user = this.userForm.value;
    this.userservice.createUser(this.user).then(val => {
      this.val = val;
      this.ans = this.val.name;
      if (this.ans == "HttpErrorResponse") {
        this.showErr = "yes";
        this.msg = undefined;
      }
      else {
        this.showErr = undefined;
        this.msg = "yes";
      }

    });
    this.userForm.reset({
      'name': '',
      '_id': '',
      'password': ''
    });
  }

}