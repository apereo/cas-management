import {FormGroup} from '@angular/forms';
import {IdTokenForm, JwksForm, MgmtFormGroup, OidcClientForm, UserinfoForm} from 'mgmt-lib';
import {AbstractRegisteredService, OidcRegisteredService} from 'domain-lib';

export class TabOidcForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get oidcClient() { return this.get('oidcClient') as OidcClientForm; }
  get jwks() { return this.get('jwks') as JwksForm; }
  get idToken() { return this.get('idToken') as IdTokenForm; }
  get userinfo() { return this.get('userinfo') as UserinfoForm; }

  constructor(public service: OidcRegisteredService) {
    super({
      oidcClient: new OidcClientForm(service),
      jwks: new JwksForm(service),
      idToken: new IdTokenForm(service),
      userinfo: new UserinfoForm(service)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OidcRegisteredService = service as OidcRegisteredService;
    this.oidcClient.mapForm(srv);
    this.jwks.mapForm(srv);
    this.idToken.mapForm(srv);
    this.userinfo.mapForm(srv);
  }
}
