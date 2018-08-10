import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/user';
import { UserServiceService } from '../services/user-service.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})

export class UserDetailComponent implements OnInit {
  u: any;
  user: any;
  spinner: 1;
  showErr: string = "yes";
  imgErr: string = undefined;

  constructor(@Inject(MAT_DIALOG_DATA) data,
    private http: HttpClient,
    private userservice: UserServiceService,
    public dialogRef: MatDialogRef<UserDetailComponent>) {

    this.user = data;

  }

  ngOnInit() {
    this.getUsertoDisplay();
  }

  getUsertoDisplay() {
    this.userservice.getUsersByPass(this.user.id, this.user.pass).then(val => {
      this.u = val;
      if (this.u == null) {
        this.showErr = "yes";
      }
      else {
        this.showErr = undefined;
        if (this.u.image == null || this.u.image == undefined) {
          this.imgErr = "yes";
        }
      }

    });
    this.spinner = undefined;
  }

  close() {
    this.dialogRef.close();
  }


}
