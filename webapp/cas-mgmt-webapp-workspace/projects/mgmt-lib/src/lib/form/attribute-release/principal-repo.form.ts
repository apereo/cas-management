import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractPrincipalAttributesRepository,
  CachingPrincipalAttributesRepository,
} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Principal Repository attributes.
 *
 * @author Travis Schmidt
 */
export class PrincipalRepoForm extends FormGroup {

  get mergingStrategy() { return this.get('mergingStrategy') as FormControl; }
  get attributeRepositoryIds() { return this.get('attributeRepositoryIds') as FormControl; }
  get ignoreResolvedAttributes() { return this.get('ignoreResolvedAttributes') as FormControl; }

  constructor(repo: AbstractPrincipalAttributesRepository) {
    super({
      mergingStrategy: new FormControl(repo?.mergingStrategy),
      attributeRepositoryIds: new FormControl(repo?.attributeRepositoryIds),
      ignoreResolvedAttributes: new FormControl(repo?.ignoreResolvedAttributes)
    });
  }

  /**
   * Maps the form values to the populated DTO.
   *
   * @param repo - AbstractPrincipalAttributesRepository
   */
  map(repo: AbstractPrincipalAttributesRepository) {
    repo.ignoreResolvedAttributes = this.ignoreResolvedAttributes.value;
    repo.attributeRepositoryIds = this.attributeRepositoryIds.value;
    repo.mergingStrategy = this.mergingStrategy.value;
  }
}

/**
 * Form that extends PrincipalRepoForm and adds caching attributes.
 */
export class CachingPrincipalRepoForm extends PrincipalRepoForm {

  get timeUnit() { return this.get('timeUnit') as FormControl; }
  get expiration() { return this.get('expiration') as FormControl; }

  constructor(repo: CachingPrincipalAttributesRepository) {
    super(repo);
    this.addControl('timeUnit', new FormControl(repo?.timeUnit));
    this.addControl('expiration', new FormControl(repo?.expiration));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param repo - CachingPrincipalAttributesRepository
   */
  map(repo: CachingPrincipalAttributesRepository) {
    super.map(repo);
    repo.timeUnit = this.timeUnit.value;
    repo.expiration = this.expiration.value;
  }
}
