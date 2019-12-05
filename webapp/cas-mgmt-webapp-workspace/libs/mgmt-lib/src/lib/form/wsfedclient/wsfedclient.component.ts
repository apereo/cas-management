import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
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
