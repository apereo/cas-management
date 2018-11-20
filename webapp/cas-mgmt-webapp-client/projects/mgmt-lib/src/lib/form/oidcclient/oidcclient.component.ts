import {Component, forwardRef, OnInit} from '@angular/core';
import {OidcRegisteredService} from '../../domain/oauth-service';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-oidcclient',
  templateUrl: './oidcclient.component.html',
  styleUrls: ['./oidcclient.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(()=> OidcclientComponent)
  }]
})
export class OidcclientComponent extends HasControls implements OnInit {

  service: OidcRegisteredService;
  original: OidcRegisteredService;
  showOAuthSecret: boolean;
  clientId: MgmtFormControl;
  clientSecret: MgmtFormControl;
  bypassApprovalPrompt: MgmtFormControl;
  generateRefreshToken: MgmtFormControl;
  jsonFormat: MgmtFormControl;
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

  constructor(public data: DataRecord) {
    super();
    this.service = data.service as OidcRegisteredService;
    this.original = data.original && data.original as OidcRegisteredService;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('clientId', this.clientId);
    c.set('clientSecret', this.clientSecret);
    c.set('bypassApprovalPrompt', this.bypassApprovalPrompt);
    c.set('generateRefreshToken', this.generateRefreshToken);
    c.set('jsonFormat', this.jsonFormat);
    c.set('jwks', this.jwks);
    c.set('scopes_userdefined', this.scopes_userdefined);
    c.set('signIdToken', this.signIdToken);
    c.set('implicit', this.implicit);
    c.set('encryptIdToken', this.encryptIdToken);
    c.set('idTokenEncryptionAlg', this.idTokenEncryptionAlg);
    c.set('idTokenEncryptionEncoding', this.idTokenEncryptionEncoding);
    c.set('subjectType', this.subjectType);
    c.set('sectorIdentifierUri', this.sectorIdentifierUri);
    c.set('dynamicRegistrationDateTime', this.dynamicRegistrationDateTime);
    return c;
  }

  ngOnInit() {
    if (!this.service.scopes) {
      this.service.scopes = [];
    }
    const og: any = this.original ? this.original : {};
    this.clientId = new MgmtFormControl(this.service.clientId, og.clientId);
    this.clientSecret = new MgmtFormControl(this.service.clientSecret, og.clientSecret);
    this.bypassApprovalPrompt = new MgmtFormControl(this.service.bypassApprovalPrompt, og.bypassApprovalPrompt);
    this.generateRefreshToken = new MgmtFormControl(this.service.generateRefreshToken, og.generateRefreshToken);
    this.jsonFormat = new MgmtFormControl(this.service.jsonFormat, og.jsonFormat);
    this.jwks = new MgmtFormControl(this.service.jwks, og.jwks);
    this.scopes_userdefined = new MgmtFormControl(this.service.scopes_userdefined, og.scopes_userdefined);
    this.signIdToken = new MgmtFormControl(this.service.signIdToken, og.signIdToken);
    this.implicit = new MgmtFormControl(this.service.implicit, og.implicit);
    this.encryptIdToken = new MgmtFormControl(this.service.encryptIdToken, og.encryptIdToken);
    this.idTokenEncryptionAlg = new MgmtFormControl(this.service.idTokenEncryptionAlg, og.idTokenEncryptionAlg);
    this.idTokenEncryptionEncoding = new MgmtFormControl(this.service.idTokenEncryptionEncoding, og.idTokenEncryptionEncoding);
    this.subjectType = new MgmtFormControl(this.service.subjectType, og.subjectType);
    this.sectorIdentifierUri = new MgmtFormControl(this.service.sectorIdentifierUri, og.sectorIdentifierUri);
    this.dynamicRegistrationDateTime = new MgmtFormControl(this.service.dynamicRegistrationDateTime, og.dynamicRegistrationDateTime);
  }

}
