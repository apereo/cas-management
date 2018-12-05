import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-wsfedclient',
  templateUrl: './wsfedclient.component.html',
  styleUrls: ['./wsfedclient.component.css']
})
export class WsfedclientComponent implements OnInit {

  @Input()
  control: FormGroup;
  realm: MgmtFormControl;
  appliesTo: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.realm = this.control.get('realm') as MgmtFormControl;
    this.appliesTo = this.control.get('appliesTo') as MgmtFormControl;
  }

}
