import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {AccessStrategyType} from '../../domain/access-strategy';

@Component({
  selector: 'lib-access-strategy',
  templateUrl: './access-strategy.component.html',
  styleUrls: ['./access-strategy.component.css']
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

  sso: MgmtFormControl;
  requireAll: MgmtFormControl;
  unauthorizedUrl: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.sso = this.control.get('sso') as MgmtFormControl;
    this.requireAll = this.control.get('requireAll') as MgmtFormControl;
    this.unauthorizedUrl = this.control.get('unauthorizedUrl') as MgmtFormControl;
  }

}
