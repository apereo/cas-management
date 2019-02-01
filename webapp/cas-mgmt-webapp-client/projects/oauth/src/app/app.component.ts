import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FormDataService} from 'mgmt-lib';
import {UserService} from 'mgmt-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router,
              public user: UserService,
              public dialog: MatDialog,
              public formData: FormDataService) {
    this.user.getUser().subscribe();
  }
}
