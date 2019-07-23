import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {ProxyType} from 'domain-lib';

@Component({
  selector: 'lib-proxy',
  templateUrl: './proxy.component.html'
})
export class ProxyComponent implements OnInit {

  type: ProxyType;
  TYPE = ProxyType;

  @Input()
  typeControl: MgmtFormControl;

  @Input()
  control: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  regex(): MgmtFormControl {
    return this.control.get('regex') as MgmtFormControl;
  }
}
