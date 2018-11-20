import {Component, Input, OnInit} from '@angular/core';
import {AbstractRegisteredService, RegexRegisteredService} from '../../domain/registered-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {SamlRegisteredService} from '../../domain/saml-service';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {Validators} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormDataService} from '../../form-data.service';

@Component({
  selector: 'lib-servicetype',
  templateUrl: './servicetype.component.html'
})
export class ServicetypeComponent implements OnInit {

  @Input()
  service: AbstractRegisteredService;

  @Input()

  type = new MgmtFormControl('', '', Validators.required);

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    if (OAuthRegisteredService.instanceOf(this.service)) {
      this.type.setValue(OAuthRegisteredService.cName);
    } else if (WSFederationRegisterdService.instanceOf(this.service)) {
      this.type.setValue(WSFederationRegisterdService.cName);
    } else if (OidcRegisteredService.instanceOf(this.service)) {
      this.type.setValue(OidcRegisteredService.cName);
    } else if (SamlRegisteredService.instanceOf(this.service)) {
      this.type.setValue(SamlRegisteredService.cName);
    } else {
      this.type.setValue(RegexRegisteredService.cName);
    }
  }

  changeType() {
    switch (this.type.value) {
      case RegexRegisteredService.cName :
        this.service = new RegexRegisteredService(this.service);
        break;
      case OAuthRegisteredService.cName :
        this.service = new OAuthRegisteredService(this.service);
        break;
      case OidcRegisteredService.cName :
        this.service = new OidcRegisteredService(this.service);
        break;
      case SamlRegisteredService.cName :
        this.service = new SamlRegisteredService(this.service);
        break;
      case WSFederationRegisterdService.cName :
        this.service = new WSFederationRegisterdService(this.service);
        break;
    }
  }

}
