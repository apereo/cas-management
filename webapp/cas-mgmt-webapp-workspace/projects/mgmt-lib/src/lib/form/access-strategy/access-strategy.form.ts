import {FormControl, FormGroup} from '@angular/forms';
import {PrincipalRepoType, RegisteredServiceAccessStrategy} from '@apereo/mgmt-lib/src/lib/model';
import {AttributesForm} from '../attributes.form';
import {PrincipalRepoForm} from '../attribute-release/principal-repo.form';
import { DelegatedForm } from '../delegated.form';

/**
 * Form group for displaying and updating access strategy policies.
 *
 * @author Travis Schmidt
 */
export class AccessStrategyForm extends FormGroup {

  get requireAll() { return this.get('requireAll') as FormControl; }
  get unauthorizedUrl() { return this.get('unauthorizedUrl') as FormControl; }
  get requiredAttributes() { return this.get('requiredAttributes') as AttributesForm; }
  get caseInsensitive() { return this.get('caseInsensitive') as FormControl; }
  get rejectedAttributes() { return this.get('rejectedAttributes') as AttributesForm; }
  get delegatedAuthenticationPolicy() { return this.get('delegatedAuthenticationPolicy') as DelegatedForm; }

  constructor(strategy: RegisteredServiceAccessStrategy) {
    super({
      requireAll: new FormControl(strategy?.requireAllAttributes),
      unauthorizedUrl: new FormControl(strategy?.unauthorizedRedirectUrl),
      requiredAttributes: new AttributesForm(strategy?.requiredAttributes),
      caseInsensitive: new FormControl(strategy?.caseInsensitive),
      rejectedAttributes: new AttributesForm(strategy?.rejectedAttributes),
      delegatedAuthenticationPolicy: new DelegatedForm(strategy?.delegatedAuthenticationPolicy)
    });
  }

  /**
   * Maps the form values to the passed strategy.
   *
   * @param strategy - RegisteredServiceAccessStrategy
   */
  map(strategy: RegisteredServiceAccessStrategy) {
    strategy.unauthorizedRedirectUrl = this.unauthorizedUrl.value;
    strategy.requireAllAttributes = this.requireAll.value;
    strategy.requiredAttributes = this.requiredAttributes.map();
    strategy.caseInsensitive = this.caseInsensitive.value;
    strategy.rejectedAttributes = this.rejectedAttributes.map();
    strategy.delegatedAuthenticationPolicy = this.delegatedAuthenticationPolicy.map();
  }
}
