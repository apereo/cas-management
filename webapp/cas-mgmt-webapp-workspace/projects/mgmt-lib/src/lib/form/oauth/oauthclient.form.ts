import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OAuthRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup} from '../mgmt-form-group';

/**
 * Form group for displaying and updating an OAuthClient.
 *
 * @author Travis Schmidt
 */
export class OauthClientForm extends FormGroup implements MgmtFormGroup<OAuthRegisteredService> {

  get clientId() {return this.get('clientId') as FormControl; }
  get clientSecret() { return this.get('clientSecret') as FormControl; }
  get bypassApprovalPrompt() { return this.get('bypassApprovalPrompt') as FormControl; }
  get generateRefreshToken() { return this.get('generateRefreshToken') as FormControl; }
  get responseTypes() { return this.get('responseTypes') as FormControl; }
  get grantTypes() { return this.get('grantTypes') as FormControl; }
  get jwtAccessToken() { return this.get('jwtAccessToken') as FormControl; }
  get showClient() { return this.get('showClient') as FormControl; }

  constructor(service: OAuthRegisteredService) {
    super({
      clientId: new FormControl(service?.clientId, Validators.required),
      clientSecret: new FormControl(service?.clientSecret, Validators.required),
      bypassApprovalPrompt: new FormControl(service?.bypassApprovalPrompt),
      generateRefreshToken: new FormControl(service?.generateRefreshToken),
      responseTypes: new FormControl(service?.responseType),
      grantTypes: new FormControl(service?.supportedGrantTypes),
      jwtAccessToken: new FormControl(service?.jwtAccessToken),
      showClient: new FormControl(false)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - OAuthRegisteredService
   */
  map(service: OAuthRegisteredService) {
    service.clientId = this.clientId.value;
    service.clientSecret = this.clientSecret.value;
    service.bypassApprovalPrompt = this.bypassApprovalPrompt.value;
    service.generateRefreshToken = this.generateRefreshToken.value;
    service.supportedResponseTypes = this.responseTypes.value;
    service.supportedGrantTypes = this.grantTypes.value;
    service.jwtAccessToken = this.jwtAccessToken.value;
  }
}
