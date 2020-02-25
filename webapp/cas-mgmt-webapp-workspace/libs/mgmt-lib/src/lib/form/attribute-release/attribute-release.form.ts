import {FormGroup} from '@angular/forms';
import {
  AbstractPrincipalAttributesRepository,
  CachingPrincipalAttributesRepository,
  DefaultPrincipalAttributesRepository,
  PrincipalRepoType,
  RegisteredServiceAttributeReleasePolicy
} from 'domain-lib';
import {ChainingFilterForm} from './filters/filters.form';
import {CachingPrincipalRepoForm, PrincipalRepoForm} from './principal-repo/principal-repo.form';
import {ConsentForm} from './consent/consent.form';
import {ChecksForm} from './checks/checks.form';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class AttributeReleaseForm extends FormGroup {

  principalRepoType: MgmtFormControl;
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
    this.principalRepoType = new MgmtFormControl(this.findRepoType(policy?.principalAttributesRepository));
    this.principalRepo = this.getRepo();
    this.principalRepoType.valueChanges.subscribe(() => this.changeRepoType());
  }

  mapForm(policy: RegisteredServiceAttributeReleasePolicy) {
    this.consent.mapForm(policy.consentPolicy);
    this.checks.mapForm(policy);
    policy.attributeFilter = this.attributeFilter.mapForm();
    this.principalRepo.mapForm(policy.principalAttributesRepository);
  }

  findRepoType(policy: AbstractPrincipalAttributesRepository) {
    if (CachingPrincipalAttributesRepository.instanceOf(policy)) {
      return PrincipalRepoType.CACHING;
    } else {
      return PrincipalRepoType.DEFAULT;
    }
  }

  getRepo(): PrincipalRepoForm {
    if (this.principalRepoType.value === PrincipalRepoType.CACHING) {
      return new CachingPrincipalRepoForm(this.policy.principalAttributesRepository as CachingPrincipalAttributesRepository);
    } else {
      return new PrincipalRepoForm(this.policy.principalAttributesRepository);
    }
  }

  changeRepoType() {
    if (this.principalRepoType.value === PrincipalRepoType.CACHING) {
      this.policy.principalAttributesRepository = new CachingPrincipalAttributesRepository(this.policy.principalAttributesRepository);
    } else {
      this.policy.principalAttributesRepository = new DefaultPrincipalAttributesRepository(this.policy.principalAttributesRepository);
    }
    this.principalRepo = this.getRepo();
  }
}

export class AllReleaseForm extends AttributeReleaseForm {}

export class DenyReleaseForm extends AttributeReleaseForm {}


