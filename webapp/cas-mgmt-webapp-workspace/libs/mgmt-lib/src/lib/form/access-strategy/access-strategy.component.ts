import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {AccessStrategyType} from 'domain-lib';

@Component({
  selector: 'lib-access-strategy',
  templateUrl: './access-strategy.component.html'
})
export class AccessStrategyComponent implements OnInit {

  @Input()
  control: FormGroup;

  @Input()
  typeControl: MgmtFormControl;

  TYPE = AccessStrategyType;
  types = [AccessStrategyType.DEFAULT,
    AccessStrategyType.TIME,
    AccessStrategyType.GROUPER,
    AccessStrategyType.REMOTE,
    AccessStrategyType.SURROGATE,
    AccessStrategyType.GROOVY_SURROGATE,
    AccessStrategyType.GROOVY
  ];

  requireAll: MgmtFormControl;
  unauthorizedUrl: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.requireAll = this.control.get('requireAll') as MgmtFormControl;
    this.unauthorizedUrl = this.control.get('unauthorizedUrl') as MgmtFormControl;
  }

}
