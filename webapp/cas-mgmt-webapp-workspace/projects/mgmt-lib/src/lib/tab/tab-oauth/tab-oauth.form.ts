import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, OAuthRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, OauthClientForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Tab form for OAuth client fields.
 *
 * @author Travis Schmidt.
 */
export class TabOauthForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get client() { return this.get('client') as OauthClientForm; }
  set client(c: OauthClientForm) { this.setControl('client', c); }

  constructor(private service: OAuthRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.client = new OauthClientForm(this.service);
  }

  /**
   * Maps the form to the passed service.
   *
   * @param service - the service
   */
  map(service: AbstractRegisteredService) {
    this.client.map(service as OAuthRegisteredService);
  }
}
