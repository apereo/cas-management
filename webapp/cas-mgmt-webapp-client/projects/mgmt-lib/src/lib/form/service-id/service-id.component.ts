import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../domain/saml-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {FormControl, Validators} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {AbstractRegisteredService} from '../../domain/registered-service';

@Component({
  selector: 'lib-service-id',
  templateUrl: './service-id.component.html',
  styleUrls: ['./service-id.component.css'],
  providers: [{provide: HasControls, useExisting: forwardRef(() => ServiceIdComponent)}]
})
export class ServiceIdComponent extends HasControls implements OnInit {

  @Input()
  data: String[];

  @Input()
  service: AbstractRegisteredService;

  isSaml: boolean;
  invalidDomain: boolean;
  serviceId: MgmtFormControl;

  constructor() {
    super();
  }

  ngOnInit() {
    this.serviceId = new MgmtFormControl(this.data[0], this.data[1], Validators.required);
    this.isSaml = SamlRegisteredService.instanceOf(this.service);
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('serviceId', this.serviceId);
    return c;
  }

  placeholder() {
    if (SamlRegisteredService.instanceOf(this.service)) {
      return 'Entity ID';
    } else if (OidcRegisteredService.instanceOf(this.service) ||
      OAuthRegisteredService.instanceOf(this.service)) {
      return 'Redirect URL';
    } else if (WSFederationRegisterdService.instanceOf(this.service)){
      return 'Consumer URL';
    } else {
      return 'Service URL';
    }
  }

  tooltip(): string {
    if (SamlRegisteredService.instanceOf(this.service)) {
      return 'An string that represents the EntityId of the SAML2 SP. This can be a regex pattern.';
    } else if (OidcRegisteredService.instanceOf(this.service) ||
      OAuthRegisteredService.instanceOf(this.service)) {
      return 'A url that represents the OAuth/OIDC server to redirect to.';
    } else if (WSFederationRegisterdService.instanceOf(this.service)) {
      return 'A url that represents a WS Federation Consumer URL';
    } else {
      return 'A url that represents the application. This can be a regex/ant formatted url.';
    }
  }


}
