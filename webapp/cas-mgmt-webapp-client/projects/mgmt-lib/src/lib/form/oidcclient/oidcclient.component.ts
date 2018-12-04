import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../form-data.service';

@Component({
  selector: 'lib-oidcclient',
  templateUrl: './oidcclient.component.html',
  styleUrls: ['./oidcclient.component.css']
})
export class OidcclientComponent implements OnInit {

  @Input()
  control: FormGroup;
  showOAuthSecret: boolean;
  dynamicallyRegistered: boolean;
  user_defined: boolean;
  clientId: MgmtFormControl;
  clientSecret: MgmtFormControl;
  bypassApprovalPrompt: MgmtFormControl;
  generateRefreshToken: MgmtFormControl;
  jwks: MgmtFormControl;
  scopes_userdefined: MgmtFormControl;
  signIdToken: MgmtFormControl;
  implicit: MgmtFormControl;
  encryptIdToken: MgmtFormControl;
  idTokenEncryptionAlg: MgmtFormControl;
  idTokenEncryptionEncoding: MgmtFormControl;
  subjectType: MgmtFormControl;
  sectorIdentifierUri: MgmtFormControl;
  dynamicRegistrationDateTime: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.clientId = this.control.get('clientId') as MgmtFormControl;
    this.clientSecret = this.control.get('clientSecret') as MgmtFormControl;
    this.bypassApprovalPrompt = this.control.get('bypassApprovalPrompt') as MgmtFormControl;
    this.generateRefreshToken = this.control.get('generateRefreshToken') as MgmtFormControl;
    this.jwks = this.control.get('jwks') as MgmtFormControl;
    this.scopes_userdefined = this.control.get('scopes_userdefined') as MgmtFormControl;
    this.signIdToken = this.control.get('signIdToken') as MgmtFormControl;
    this.implicit = this.control.get('implicit') as MgmtFormControl;
    this.encryptIdToken = this.control.get('encryptIdToken') as MgmtFormControl;
    this.idTokenEncryptionAlg = this.control.get('idTokenEncryptionAlg') as MgmtFormControl;
    this.idTokenEncryptionEncoding = this.control.get('idTokenEncryptionEncoding') as MgmtFormControl;
    this.subjectType = this.control.get('subjectType') as MgmtFormControl;
    this.sectorIdentifierUri = this.control.get('sectorIdentifierUri') as MgmtFormControl;
    this.dynamicRegistrationDateTime = this.control.get('dynamicRegistrationDateTime') as MgmtFormControl;
  }
}
