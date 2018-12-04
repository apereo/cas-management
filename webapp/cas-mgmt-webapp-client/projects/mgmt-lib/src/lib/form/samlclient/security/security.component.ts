import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SamlSecurityComponent implements OnInit {

  @Input()
  control: FormGroup;
  signAssertions: MgmtFormControl;
  signResponses: MgmtFormControl;
  encryptAssertions: MgmtFormControl;
  signingCredentialType: MgmtFormControl;
  requiredAuthenticationContextClass: MgmtFormControl;
  assertionAudiences: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.signAssertions = this.control.get('signAssertions') as MgmtFormControl;
    this.signResponses = this.control.get('signResponses') as MgmtFormControl;
    this.encryptAssertions = this.control.get('encryptAssertions') as MgmtFormControl;
    this.signingCredentialType = this.control.get('signingCredentialType') as MgmtFormControl;
    this.requiredAuthenticationContextClass = this.control.get('requiredAuthenticationContextClass') as MgmtFormControl;
    this.assertionAudiences = this.control.get('assertionAudiences') as MgmtFormControl;
  }
}
