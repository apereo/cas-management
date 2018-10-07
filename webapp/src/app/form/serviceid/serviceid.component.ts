import {Component, Input, OnInit } from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../../domain/oauth-service';
import {WSFederationRegisterdService} from '../../../domain/wsed-service';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'app-serviceid',
  templateUrl: './serviceid.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class ServiceidComponent implements OnInit {

  isSaml: boolean;

  @Input()
  validUrl: Function;

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
    this.isSaml = SamlRegisteredService.instanceOf(this.data.service);
  }

  placeholder() {
    if (SamlRegisteredService.instanceOf(this.data.service)) {
      return this.messages.services_form_label_entityId;
    } else if (OidcRegisteredService.instanceOf(this.data.service) ||
               OAuthRegisteredService.instanceOf(this.data.service)) {
      return this.messages.services_form_label_redirect_url;
    } else if (WSFederationRegisterdService.instanceOf(this.data.service)) {
      return this.messages.services_form_label_consumer_url;
    } else {
      return this.messages.services_form_label_serviceId;
    }
  }

  tooltip(): string {
    if (SamlRegisteredService.instanceOf(this.data.service)) {
      return this.messages.services_form_tooltip_entityId;
    } else if (OidcRegisteredService.instanceOf(this.data.service) ||
               OAuthRegisteredService.instanceOf(this.data.service)) {
      return this.messages.services_form_tooltip_redirect_url;
    } else if (WSFederationRegisterdService.instanceOf(this.data.service)) {
      return this.messages.services_form_tooltip_consumer_url;
    } else {
      return this.messages.services_form_tooltip_serviceId;
    }
  }

}
