import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {RegexRegisteredService} from '../../../domain/registered-service';
import {OAuthRegisteredService, OidcRegisteredService} from '../../../domain/oauth-service';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {WSFederationRegisterdService} from '../../../domain/wsed-service';
import {Data} from '../data';

@Component({
  selector: 'app-servicetype',
  templateUrl: './servicetype.component.html'
})
export class ServicetypeComponent implements OnInit {

  type: string;

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
    if (OAuthRegisteredService.instanceOf(this.data.service)) {
      this.type = OAuthRegisteredService.cName;
    } else if (WSFederationRegisterdService.instanceOf(this.data.service)) {
      this.type = WSFederationRegisterdService.cName;
    } else if (OidcRegisteredService.instanceOf(this.data.service)) {
      this.type = OidcRegisteredService.cName;
    } else if (SamlRegisteredService.instanceOf(this.data.service)) {
      this.type = SamlRegisteredService.cName;
    } else {
      this.type = RegexRegisteredService.cName;
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
