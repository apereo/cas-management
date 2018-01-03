import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../../domain/oauth-service';
import {WSFederationRegisterdService} from '../../../domain/wsed-service';
import {AbstractControl, FormControl, ValidatorFn, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material";

@Component({
  selector: 'app-serviceid',
  templateUrl: './serviceid.component.html'
})
export class ServiceidComponent implements OnInit {

  isSaml: boolean;

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
    this.isSaml = SamlRegisteredService.instanceOf(this.data.service);
    console.log(this.data.invalidDomain);
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

  tooltip() {
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
