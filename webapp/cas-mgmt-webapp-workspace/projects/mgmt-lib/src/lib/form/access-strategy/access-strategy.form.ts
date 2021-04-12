import {FormControl, FormGroup} from '@angular/forms';
import {PrincipalRepoType, RegisteredServiceAccessStrategy} from '@apereo/mgmt-lib/src/lib/model';
import {AttributesForm} from '../attributes.form';
import {PrincipalRepoForm} from '../attribute-release/principal-repo.form';

/**
 * Form group for displaying and updating access strategy policies.
 *
 * @author Travis Schmidt
 */
export class AccessStrategyForm extends FormGroup {

  principalRepoType: FormControl;
  get requireAll() { return this.get('requireAll') as FormControl; }
  get unauthorizedUrl() { return this.get('unauthorizedUrl') as FormControl; }
  get requiredAttributes() { return this.get('requiredAttributes') as AttributesForm; }
  get caseInsensitive() { return this.get('caseInsensitive') as FormControl; }
  get rejectedAttributes() { return this.get('rejectedAttributes') as AttributesForm; }
  get principalRepo() { return this.get('repo') as PrincipalRepoForm; }

  constructor(strategy: RegisteredServiceAccessStrategy) {
    super({
      requireAll: new FormControl(strategy?.requireAllAttributes),
      unauthorizedUrl: new FormControl(strategy?.unauthorizedRedirectUrl),
      requiredAttributes: new AttributesForm(strategy?.requiredAttributes),
      caseInsensitive: new FormControl(strategy?.caseInsensitive),
      rejectedAttributes: new AttributesForm(strategy?.rejectedAttributes),
      repo: new PrincipalRepoForm(strategy?.principalAttributesRepository)
    });
    this.principalRepoType = new FormControl(PrincipalRepoType.DEFAULT);
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
  }
}
