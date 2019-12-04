import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {ProxyType} from 'domain-lib';
import {ProxyForm, RegExProxyForm} from './proxy.form';

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
  form: ProxyForm;

  constructor() {
  }

  ngOnInit() {
  }

  regex(): RegExProxyForm {
    return this.form as RegExProxyForm;
  }
}
