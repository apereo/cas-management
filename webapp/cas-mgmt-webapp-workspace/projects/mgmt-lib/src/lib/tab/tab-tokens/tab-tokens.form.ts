import {FormGroup} from '@angular/forms';
import {OAuthRegisteredService, AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {
  AccessTokenExpirationForm,
  CodeExpirationForm,
  DeviceTokenExpirationForm,
  MgmtFormGroup,
  RefreshTokenExpirationForm
} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Form group for displaying and updating Token attributes for a service.
 *
 * @author Travis Schmidt
 */
export class TabTokenForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get code() { return this.get('code') as CodeExpirationForm; }
  set code(c: CodeExpirationForm) { this.setControl('code', c); }
  get accessToken() { return this.get('access') as AccessTokenExpirationForm; }
  set accessToken(c: AccessTokenExpirationForm) { this.setControl('access', c); }
  get refreshToken() { return this.get('refresh') as RefreshTokenExpirationForm; }
  set refreshToken(c: RefreshTokenExpirationForm) { this.setControl('refresh', c); }
  get deviceToken() { return this.get('device') as DeviceTokenExpirationForm; }
  set deviceToken(c: DeviceTokenExpirationForm) { this.setControl('device', c); }

  constructor(public service: OAuthRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.code = new CodeExpirationForm(this.service?.codeExpirationPolicy);
    this.accessToken = new AccessTokenExpirationForm(this.service?.accessTokenExpirationPolicy);
    this.refreshToken = new RefreshTokenExpirationForm(this.service?.refreshTokenExpirationPolicy);
    this.deviceToken = new DeviceTokenExpirationForm(this.service?.deviceTokenExpirationPolicy);
  }

  /**
   * Map form values to the passed DTO.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    const srv: OAuthRegisteredService = service as OAuthRegisteredService;
    srv.codeExpirationPolicy = this.code.map();
    srv.accessTokenExpirationPolicy = this.accessToken.map();
    srv.refreshTokenExpirationPolicy = this.refreshToken.map();
    srv.deviceTokenExpirationPolicy = this.deviceToken.map();
  }
}
