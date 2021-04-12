import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractPrincipalAttributesRepository,
  CachingPrincipalAttributesRepository,
  DefaultPrincipalAttributesRepository,
  PrincipalRepoType,
  RegisteredServiceAttributeReleasePolicy
} from '@apereo/mgmt-lib/src/lib/model';
import {ChainingFilterForm} from './filters.form';
import {CachingPrincipalRepoForm, PrincipalRepoForm} from './principal-repo.form';
import {ConsentForm} from './consent.form';
import {ChecksForm} from './checks.form';

/**
 * Form group to display and update fields for Attribute Release policies.
 *
 * @author Travis Schmidt
 */
export class AttributeReleaseForm extends FormGroup {

  principalRepoType: FormControl;
  get attributeFilter() { return this.get('attributeFilter') as ChainingFilterForm; }
  get principalRepo() { return this.get('repo') as PrincipalRepoForm; }
  set principalRepo(p: PrincipalRepoForm) { this.setControl('repo', p); }
  get consent() { return this.get('consent') as ConsentForm; }
  get checks() { return this.get('checks') as ChecksForm; }

  constructor(private policy: RegisteredServiceAttributeReleasePolicy) {
    super({
      attributeFilter: new ChainingFilterForm(policy?.attributeFilter),
      consent: new ConsentForm(policy?.consentPolicy),
      checks: new ChecksForm(policy)
    });
    this.principalRepoType = new FormControl(this.findRepoType(policy?.principalAttributesRepository));
    this.principalRepo = this.getRepo();
    this.principalRepoType.valueChanges.subscribe(() => this.changeRepoType());
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param policy - RegisteredServiceAttributeReleasePolicy
   */
  map(policy: RegisteredServiceAttributeReleasePolicy) {
    this.consent.map(policy.consentPolicy);
    this.checks.map(policy);
    policy.attributeFilter = this.attributeFilter.map();
    this.principalRepo.map(policy.principalAttributesRepository);
  }

  /**
   * Returns the repo type value that corresponds to the passed poilicy.
   *
   * @param policy - AbstractPrincipalAttributesRepository
   */
  findRepoType(policy: AbstractPrincipalAttributesRepository) {
    if (CachingPrincipalAttributesRepository.instanceOf(policy)) {
      return PrincipalRepoType.CACHING;
    } else {
      return PrincipalRepoType.DEFAULT;
    }
  }

  /**
   * Returns the correct form type based on the policy type.
   */
  getRepo(): PrincipalRepoForm {
    if (this.principalRepoType.value === PrincipalRepoType.CACHING) {
      return new CachingPrincipalRepoForm(this.policy.principalAttributesRepository as CachingPrincipalAttributesRepository);
    } else {
      return new PrincipalRepoForm(this.policy.principalAttributesRepository);
    }
  }

  /**
   * Changes the repository type to the opposite of the current type.
   */
  changeRepoType() {
    if (this.principalRepoType.value === PrincipalRepoType.CACHING) {
      this.policy.principalAttributesRepository = new CachingPrincipalAttributesRepository(this.policy.principalAttributesRepository);
    } else {
      this.policy.principalAttributesRepository = new DefaultPrincipalAttributesRepository(this.policy.principalAttributesRepository);
    }
    this.principalRepo = this.getRepo();
  }
}

/**
 * Form for ReturnAllAttributeRelasePolicy.
 */
export class AllReleaseForm extends AttributeReleaseForm {}

/**
 * Form for DenyAllAttributeReleasePolicy.
 */
export class DenyReleaseForm extends AttributeReleaseForm {}


