import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-sso-policy',
  templateUrl: './sso-policy.component.html',
  styleUrls: ['./sso-policy.component.css']
})
export class SsoPolicyComponent implements OnInit {

  @Input()
  control: FormGroup;
  timeUnit: MgmtFormControl;
  timeValue: MgmtFormControl;

  constructor() { }

  ngOnInit() {
    this.timeUnit = this.control.get('timeUnit') as MgmtFormControl;
    this.timeValue = this.control.get('timeValue') as MgmtFormControl;
  }

}
