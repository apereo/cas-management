import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {AccessStrategyType} from 'domain-lib';
import {AccessStrategyForm} from './access-strategy.form';

@Component({
  selector: 'lib-access-strategy',
  templateUrl: './access-strategy.component.html'
})
export class AccessStrategyComponent implements OnInit {

  @Input()
  form: AccessStrategyForm;

  @Input()
  type: MgmtFormControl;

  TYPE = AccessStrategyType;
  types = [AccessStrategyType.DEFAULT,
    AccessStrategyType.TIME,
    AccessStrategyType.GROUPER,
    AccessStrategyType.REMOTE,
    AccessStrategyType.SURROGATE,
    AccessStrategyType.GROOVY_SURROGATE,
    AccessStrategyType.GROOVY
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
