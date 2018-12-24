import {Component, Input, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../domain/saml-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-service-id',
  templateUrl: './service-id.component.html'
})
export class ServiceIdComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  @Input()
  serviceType: MgmtFormControl;

  prompt: string;
  tip: string;

  constructor() {
  }

  ngOnInit() {
    if (this.serviceType != null) {
      this.serviceType.valueChanges.subscribe(type => {
        this.placeholder(type);
        this.tooltip(type);
      });
    }
    this.tooltip(this.serviceType.value);
    this.placeholder(this.serviceType.value);
   }


  placeholder(type: string) {
    if (SamlRegisteredService.cName === type) {
      this.prompt = 'Entity ID';
    } else if (OidcRegisteredService.cName === type ||
      OAuthRegisteredService.cName === type) {
      this.prompt =  'Redirect URL';
    } else if (WSFederationRegisterdService.cName === type) {
      this.prompt = 'Consumer URL';
    } else {
      this.prompt = 'Service URL';
    }
  }

  tooltip(type: string) {
    if (SamlRegisteredService.cName === type) {
      this.tip = 'An string that represents the EntityId of the SAML2 SP. This can be a regex pattern.';
    } else if (OidcRegisteredService.cName === type ||
      OAuthRegisteredService.cName === type) {
      this.tip = 'A url that represents the OAuth/OIDC server to redirect to.';
    } else if (WSFederationRegisterdService.cName === type) {
      this.tip = 'A url that represents a WS Federation Consumer URL';
    } else {
      this.tip = 'A url that represents the application. This can be a regex/ant formatted url.';
    }
  }


}
