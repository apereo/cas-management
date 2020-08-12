import {Component, Input, OnInit} from '@angular/core';
import {WsfedclientForm} from './wsfedclient.form';

@Component({
  selector: 'lib-wsfedclient',
  templateUrl: './wsfedclient.component.html'
})
export class WsfedclientComponent implements OnInit {

  @Input()
  form: WsfedclientForm;

  constructor() {
  }

  ngOnInit() {
  }

}
