import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  @Input()
  control: FormGroup;
  multifactorAuthenticationProviders: MgmtFormControl;
  failureMode: MgmtFormControl;
  principalAttributeNameTrigger: MgmtFormControl;
  principalAttributeValueToMatch: MgmtFormControl;
  bypassEnabled: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.multifactorAuthenticationProviders = this.control.get('multifactorAuthenticationProviders') as MgmtFormControl;
    this.failureMode = this.control.get('failureMode') as MgmtFormControl;
    this.principalAttributeNameTrigger = this.control.get('principalAttributeNameTrigger') as MgmtFormControl;
    this.principalAttributeValueToMatch = this.control.get('principalAttributeValueToMatch') as MgmtFormControl;
    this.bypassEnabled = this.control.get('bypassEnabled') as MgmtFormControl;
  }

}
