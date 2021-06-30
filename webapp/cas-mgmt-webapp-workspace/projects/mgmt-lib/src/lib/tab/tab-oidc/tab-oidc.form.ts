import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, OidcClientForm, IdTokenForm, UserinfoForm, JwksForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating OIDC options for a service.
 *
 * @author Travis Schmidt
 */
export class TabOidcForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get oidcClient() { return this.get('oidcClient') as OidcClientForm; }
  set oidcClient(c: OidcClientForm) { this.setControl('oidcClient', c); }
  get jwks() { return this.get('jwks') as JwksForm; }
  set jwks(c: JwksForm) { this.setControl('jwks', c); }
  get idToken() { return this.get('idToken') as IdTokenForm; }
  set idToken(c: IdTokenForm) { this.setControl('idToken', c); }
  get userinfo() { return this.get('userinfo') as UserinfoForm; }
  set userinfo(c: UserinfoForm) { this.setControl('userinfo', c); }

  constructor(private service: OidcRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.oidcClient = new OidcClientForm(this.service);
    this.jwks = new JwksForm(this.service);
    this.idToken = new IdTokenForm(this.service);
    this.userinfo = new UserinfoForm(this.service);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    const srv: OidcRegisteredService = service as OidcRegisteredService;
    this.oidcClient.map(srv);
    this.jwks.map(srv);
    this.idToken.map(srv);
    this.userinfo.map(srv);
  }
}
