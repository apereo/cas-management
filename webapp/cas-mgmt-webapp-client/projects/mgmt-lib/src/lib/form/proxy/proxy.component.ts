import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {ProxyType} from '../../domain/proxy-policy';

@Component({
  selector: 'lib-proxy',
  templateUrl: './proxy.component.html'
})
export class ProxyComponent implements OnInit {

  type: ProxyType;
  TYPE = ProxyType;

  @Input()
  control: FormGroup;
  typeControl: MgmtFormControl;
  regex: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.typeControl = this.control.get('type') as MgmtFormControl;
    this.regex = this.control.get('regex') as MgmtFormControl;
  }
}
