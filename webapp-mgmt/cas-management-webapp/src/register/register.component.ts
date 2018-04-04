import {Component, OnInit} from '@angular/core';
import {Messages} from '../app/messages';
import {Router} from '@angular/router';

@Component({
  selector: 'regisgter-root',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

  constructor(public messages: Messages,
              public router: Router) {
  }

  ngOnInit() {

  }

}


