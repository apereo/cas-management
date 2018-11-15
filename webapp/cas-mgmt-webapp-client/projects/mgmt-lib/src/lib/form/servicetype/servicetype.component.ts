import {Component, OnInit} from '@angular/core';
import {RegexRegisteredService} from '../../domain/registered-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {SamlRegisteredService} from '../../domain/saml-service';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {DataRecord} from '../data';
import {FormArray, FormControl, Validators} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-servicetype',
  templateUrl: './servicetype.component.html'
})
export class ServicetypeComponent implements OnInit {

  type = new MgmtFormControl('', Validators.required);

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    if (OAuthRegisteredService.instanceOf(this.data.service)) {
      this.type.setValue(OAuthRegisteredService.cName);
    } else if (WSFederationRegisterdService.instanceOf(this.data.service)) {
      this.type.setValue(WSFederationRegisterdService.cName);
    } else if (OidcRegisteredService.instanceOf(this.data.service)) {
      this.type.setValue(OidcRegisteredService.cName);
    } else if (SamlRegisteredService.instanceOf(this.data.service)) {
      this.type.setValue(SamlRegisteredService.cName);
    } else {
      this.type.setValue(RegexRegisteredService.cName);
    }
  }

  changeType() {
    switch (this.type) {
      case RegexRegisteredService.cName :
        this.data.service = new RegexRegisteredService(this.data.service);
        break;
      case OAuthRegisteredService.cName :
        this.data.service = new OAuthRegisteredService(this.data.service);
        break;
      case OidcRegisteredService.cName :
        this.data.service = new OidcRegisteredService(this.data.service);
        break;
      case SamlRegisteredService.cName :
        this.data.service = new SamlRegisteredService(this.data.service);
        break;
      case WSFederationRegisterdService.cName :
        this.data.service = new WSFederationRegisterdService(this.data.service);
        break;
    }
  }

}
