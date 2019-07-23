import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-assertion',
  templateUrl: './assertion.component.html',
  styleUrls: ['./assertion.component.css']
})
export class AssertionComponent implements OnInit {

  @Input()
  control: FormGroup;
  requiredAuthenticationContextClass: MgmtFormControl;
  assertionAudiences: MgmtFormControl;
  issuerEntityId: MgmtFormControl;
  skewAllowance: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.requiredAuthenticationContextClass = this.control.get('requiredAuthenticationContextClass') as MgmtFormControl;
    this.assertionAudiences = this.control.get('assertionAudiences') as MgmtFormControl;
    this.issuerEntityId = this.control.get('issuerEntityId') as MgmtFormControl;
    this.skewAllowance = this.control.get('skewAllowance') as MgmtFormControl;
  }

}
