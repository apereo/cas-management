import {Component, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../domain/saml-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-service-id',
  templateUrl: './service-id.component.html',
  styleUrls: ['./service-id.component.css']
})
export class ServiceIdComponent implements OnInit {

  isSaml: boolean;

  //@Input()
  //validUrl: Function;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.isSaml = SamlRegisteredService.instanceOf(this.data.service);
  }

  placeholder() {
    if (SamlRegisteredService.instanceOf(this.data.service)) {
      return 'Entity ID';
    } else if (OidcRegisteredService.instanceOf(this.data.service) ||
      OAuthRegisteredService.instanceOf(this.data.service)) {
      return 'Redirect URL';
    } else if (WSFederationRegisterdService.instanceOf(this.data.service)) {
      return 'Consumer URL';
    } else {
      return 'Service URL';
    }
  }

  tooltip(): string {
    if (SamlRegisteredService.instanceOf(this.data.service)) {
      return 'An string that represents the EntityId of the SAML2 SP. This can be a regex pattern.';
    } else if (OidcRegisteredService.instanceOf(this.data.service) ||
      OAuthRegisteredService.instanceOf(this.data.service)) {
      return 'A url that represents the OAuth/OIDC server to redirect to.';
    } else if (WSFederationRegisterdService.instanceOf(this.data.service)) {
      return 'A url that represents a WS Federation Consumer URL';
    } else {
      return 'A url that represents the application. This can be a regex/ant formatted url.';
    }
  }


}
