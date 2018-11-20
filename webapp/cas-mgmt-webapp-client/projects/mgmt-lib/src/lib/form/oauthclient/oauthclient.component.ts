import {Component, forwardRef, OnInit} from '@angular/core';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-oauthclient',
  templateUrl: './oauthclient.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => OauthclientComponent)
  }]
})
export class OauthclientComponent extends HasControls implements OnInit {

  service: OAuthRegisteredService;
  original: OAuthRegisteredService;
  showOAuthSecret: boolean;
  clientId: MgmtFormControl;
  clientSecret: MgmtFormControl;
  bypassApprovalPrompt: MgmtFormControl;
  generateRefreshToken: MgmtFormControl;
  jsonFormat: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.service = data.service as OAuthRegisteredService;
    this.original = data.original && data.original as OAuthRegisteredService;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('clientId', this.clientId);
    c.set('clientSecret', this.clientSecret);
    c.set('bypassApprovalPrompt', this.bypassApprovalPrompt);
    c.set('generateRefreshToken', this.generateRefreshToken);
    c.set('jsonFormat', this.jsonFormat);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.clientId = new MgmtFormControl(this.service.clientId, og.clientId);
    this.clientSecret = new MgmtFormControl(this.service.clientSecret, og.clientSecret);
    this.bypassApprovalPrompt = new MgmtFormControl(this.service.bypassApprovalPrompt, og.bypassApprovalPrompt);
    this.generateRefreshToken = new MgmtFormControl(this.service.generateRefreshToken, og.generateRefreshToken);
    this.jsonFormat = new MgmtFormControl(this.service.jsonFormat, og.jsonFormat);
  }

  isOidc() {
    return OidcRegisteredService.instanceOf(this.data.service);
  }
}
