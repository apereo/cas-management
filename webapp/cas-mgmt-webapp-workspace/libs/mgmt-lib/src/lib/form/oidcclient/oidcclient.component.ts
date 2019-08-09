import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../form-data.service';

@Component({
  selector: 'lib-oidcclient',
  templateUrl: './oidcclient.component.html'
})
export class OidcclientComponent implements OnInit {

  @Input()
  control: FormGroup;

  @Input()
  hideKeys = false;

  dynamicallyRegistered: boolean;
  tokenEndpointAuthenticationMethod: MgmtFormControl;
  implicit: MgmtFormControl;
  applicationType: MgmtFormControl;
  subjectType: MgmtFormControl;
  sectorIdentifierUri: MgmtFormControl;
  dynamicRegistrationDateTime: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.tokenEndpointAuthenticationMethod = this.control.get('tokenEndpointAuthenticationMethod') as MgmtFormControl;
    this.implicit = this.control.get('implicit') as MgmtFormControl;
    this.applicationType = this.control.get('applicationType') as MgmtFormControl;
    this.subjectType = this.control.get('subjectType') as MgmtFormControl;
    this.sectorIdentifierUri = this.control.get('sectorIdentifierUri') as MgmtFormControl;
    this.dynamicRegistrationDateTime = this.control.get('dynamicRegistrationDateTime') as MgmtFormControl;
  }
}
