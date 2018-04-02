import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material';
import {Messages} from '../../app/messages';

@Component({
  selector: 'register-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('search') search: ElementRef;

  type: String;

  constructor(public messages: Messages,
              public router: Router,
              public location: Location,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  doSearch(val: string) {
    this.router.navigate( ['search', val]);
  }

  logout() {
    window.location.href = 'logout.html';
  }

}
