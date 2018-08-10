import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { User } from '../shared/user';
import { UserServiceService } from '../services/user-service.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user = { email: "", password: "" };
  user_data: User = null;
  showErr: string;
  val: any;

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };


  constructor(private fb: FormBuilder,
    private socialAuthService: AuthService,
    private userservice: UserServiceService,
    private dailog: MatDialog) {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]]
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

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.user_data = { name: userData.name, image: userData.image, _id: userData.email, password: "social_login" };
        this.user.email = userData.email;
        this.user.password = this.user_data.password;
        this.userservice.createUser(this.user_data).then(val => {
          this.val = val;
        });
        this.open();
      }
    );
  }

  return_to_page() {
    return this.user_data;
  }

  open() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.user.email,
      pass: this.user.password
    };

    this.userForm.reset({
      'email': '',
      'password': ''
    });

    this.dailog.open(UserDetailComponent, dialogConfig);

  }

  onSubmit() {

    this.user = this.userForm.value;
    this.userservice.getUsers(this.user.email).then(val => {
      this.val = val;

      if (this.val == null) {

        this.showErr = "yes";
      }
      else {
        this.showErr = undefined;
        this.open();
      }

    });


  }

}