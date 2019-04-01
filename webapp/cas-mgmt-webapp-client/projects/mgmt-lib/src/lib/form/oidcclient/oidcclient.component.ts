import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  showOAuthSecret: boolean;
  dynamicallyRegistered: boolean;
  clientId: MgmtFormControl;
  clientSecret: MgmtFormControl;
  bypassApprovalPrompt: MgmtFormControl;
  generateRefreshToken: MgmtFormControl;
  jwks: MgmtFormControl;
  signIdToken: MgmtFormControl;
  implicit: MgmtFormControl;
  encryptIdToken: MgmtFormControl;
  idTokenEncryptionAlg: MgmtFormControl;
  idTokenEncryptionEncoding: MgmtFormControl;
  subjectType: MgmtFormControl;
  sectorIdentifierUri: MgmtFormControl;
  dynamicRegistrationDateTime: MgmtFormControl;
  responseTypes: MgmtFormControl;
  grantTypes: MgmtFormControl;

  @Output()
  generateId: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  generateSecret: EventEmitter<void> = new EventEmitter<void>();

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.clientId = this.control.get('clientId') as MgmtFormControl;
    this.clientSecret = this.control.get('clientSecret') as MgmtFormControl;
    this.bypassApprovalPrompt = this.control.get('bypassApprovalPrompt') as MgmtFormControl;
    this.generateRefreshToken = this.control.get('generateRefreshToken') as MgmtFormControl;
    this.jwks = this.control.get('jwks') as MgmtFormControl;
    this.signIdToken = this.control.get('signIdToken') as MgmtFormControl;
    this.implicit = this.control.get('implicit') as MgmtFormControl;
    this.encryptIdToken = this.control.get('encryptIdToken') as MgmtFormControl;
    this.idTokenEncryptionAlg = this.control.get('idTokenEncryptionAlg') as MgmtFormControl;
    this.idTokenEncryptionEncoding = this.control.get('idTokenEncryptionEncoding') as MgmtFormControl;
    this.subjectType = this.control.get('subjectType') as MgmtFormControl;
    this.sectorIdentifierUri = this.control.get('sectorIdentifierUri') as MgmtFormControl;
    this.dynamicRegistrationDateTime = this.control.get('dynamicRegistrationDateTime') as MgmtFormControl;
    this.responseTypes = this.control.get('responseTypes') as MgmtFormControl;
    this.grantTypes = this.control.get('grantTypes') as MgmtFormControl;
  }
}
