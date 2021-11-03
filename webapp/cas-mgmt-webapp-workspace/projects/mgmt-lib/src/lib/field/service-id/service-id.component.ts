import {Component, Input, OnInit} from '@angular/core';
import {
  SamlRegisteredService,
  WSFederationRegisteredService,
  OAuthRegisteredService,
  OidcRegisteredService
} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update the service id for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-service-id',
  templateUrl: './service-id.component.html'
})
export class ServiceIdComponent implements OnInit {

  @Input()
  control: FormControl;

  @Input()
  serviceType: FormControl;

  prompt: string;
  tip: string;

  /**
   * Starts the component by setting placeholder and tips by service type.
   */
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

  /**
   * Returns the placeholder text to display based on service type.
   *
   * @param type - service type
   */
  placeholder(type: string) {
    if (SamlRegisteredService.cName === type) {
      this.prompt = 'Entity ID';
    } else if (OidcRegisteredService.cName === type ||
      OAuthRegisteredService.cName === type) {
      this.prompt =  'Redirect URL';
    } else if (WSFederationRegisteredService.cName === type) {
      this.prompt = 'Consumer URL';
    } else {
      this.prompt = 'Service URL';
    }
  }

  /**
   * Returns the tooltip text to display based on the service type passed.
   *
   * @param type - service type
   */
  tooltip(type: string) {
    if (SamlRegisteredService.cName === type) {
      this.tip = 'An string that represents the EntityId of the SAML2 SP. This can be a regex pattern.';
    } else if (OidcRegisteredService.cName === type || OAuthRegisteredService.cName === type) {
      this.tip = 'A url that represents the OAuth/OIDC server to redirect to.';
    } else if (WSFederationRegisteredService.cName === type) {
      this.tip = 'A url that represents a WS Federation Consumer URL';
    } else {
      this.tip = 'A url that represents the application. This can be a regex/ant formatted url.';
    }
  }

}
