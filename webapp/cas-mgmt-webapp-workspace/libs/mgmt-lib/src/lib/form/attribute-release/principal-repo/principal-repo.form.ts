import {FormGroup} from '@angular/forms';
import {
  AbstractPrincipalAttributesRepository,
  CachingPrincipalAttributesRepository,
} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class PrincipalRepoForm extends FormGroup {

  get mergingStrategy() { return this.get('mergingStrategy') as MgmtFormControl; }
  get attributeRepositoryIds() { return this.get('attributeRepositoryIds') as MgmtFormControl; }
  get ignoreResolvedAttributes() { return this.get('ignoreResolvedAttributes') as MgmtFormControl; }

  constructor(repo: AbstractPrincipalAttributesRepository) {
    super({
      mergingStrategy: new MgmtFormControl(repo && repo.mergingStrategy),
      attributeRepositoryIds: new MgmtFormControl(repo && repo.attributeRepositoryIds),
      ignoreResolvedAttributes: new MgmtFormControl(repo && repo.ignoreResolvedAttributes)
    });
  }

  mapForm(repo: AbstractPrincipalAttributesRepository) {
    repo.ignoreResolvedAttributes = this.ignoreResolvedAttributes.value;
    repo.attributeRepositoryIds = this.attributeRepositoryIds.value;
    repo.mergingStrategy = this.mergingStrategy.value;
  }
}

export class CachingPrincipalRepoForm extends PrincipalRepoForm {

  get timeUnit() { return this.get('timeUnit') as MgmtFormControl; }
  get expiration() { return this.get('expiration') as MgmtFormControl; }

  constructor(repo: CachingPrincipalAttributesRepository) {
    super(repo);
    this.addControl('timeUnit', new MgmtFormControl(repo && repo.timeUnit));
    this.addControl('expiration', new MgmtFormControl(repo && repo.expiration));
  }

  mapForm(repo: CachingPrincipalAttributesRepository) {
    super.mapForm(repo);
    repo.timeUnit = this.timeUnit.value;
    repo.expiration = this.expiration.value;
  }
}
