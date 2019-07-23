import {FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  CachingPrincipalAttributesRepository,
  DenyAllAttributeReleasePolicy,
  GroovySamlRegisteredServiceAttributeReleasePolicy,
  GroovyScriptAttributeReleasePolicy,
  InCommonRSAttributeReleasePolicy,
  MetadataEntityAttributesAttributeReleasePolicy,
  PatternMatchingEntityIdAttributeReleasePolicy,
  PrincipalAttributesRepository,
  PrincipalRepoType,
  RegisteredServiceAttributeReleasePolicy,
  ReleasePolicyType,
  ReturnAllAttributeReleasePolicy,
  ReturnAllowedAttributeReleasePolicy,
  ReturnMappedAttributeReleasePolicy,
  ReturnRestfulAttributeReleasePolicy,
  ScriptedRegisteredServiceAttributeReleasePolicy,
  FilterType,
  RegisteredServiceAttributeFilter,
  RegisteredServiceChainingAttributeFilter,
  RegisteredServiceMappedRegexAttributeFilter,
  RegisteredServiceMutantRegexAttributeFilter,
  RegisteredServiceRegexAttributeFilter,
  RegisteredServiceReverseMappedRegexAttributeFilter,
  RegisteredServiceScriptedAttributeFilter,
  attributeReleaseFactory,
  attributeFilterFactory
} from 'domain-lib';
import {RestfulReleaseForm} from './policy/restful-release-form';
import {ScriptReleaseForm} from './policy/script-release-form';
import {GroovyReleaseForm} from './policy/groovy-release-form';
import {GroovySamlReleaseForm} from './policy/groovy-saml-release-form';
import {DenyReleaseForm} from './policy/deny-release-form';
import {MappedReleaseForm} from './policy/mapped-release-form';
import {MetadataReleaseForm} from './policy/metadata-release-form';
import {AllowedReleaseForm} from './policy/allowed-release-form';
import {AllReleaseForm} from './policy/all-release-form';
import {BaseReleaseForm} from './policy/base-release-form';
import {RegexFilterForm} from './filter/regex-filter-form';
import {MappedFilterForm} from './filter/mapped-filter-form';
import {ReverseMappedFilterForm} from './filter/reverse-mapped-filter-form';
import {MutantMappedFilterForm} from './filter/mutant-mapped-filter-form';
import {ScriptFilterForm} from './filter/script-filter-form';
import {ChainingFilterForm} from './filter/chaining-filter-form';
import {BaseFilterForm} from './filter/filter-form';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';

export class ReleaseForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  policy: MgmtFormGroup<RegisteredServiceAttributeReleasePolicy>;
  filter: BaseFilterForm<RegisteredServiceAttributeFilter>;

  constructor(public releasePolicy: RegisteredServiceAttributeReleasePolicy) {
    super({});
    const type = this.findType(releasePolicy);
    this.type = new MgmtFormControl(type);
    this.policy = this.getPolicy(type);
    this.filter = this.getFilter(releasePolicy.attributeFilter);
    this.addControl('type', this.type);
    this.addControl('policy', this.policy);
    this.addControl('filter', this.filter);
    this.type.valueChanges.subscribe(t => this.changeType(t));
    this.policy.get('principalRepo').get('type').valueChanges.subscribe(val => {
      this.policy.get('principalRepo').markAsPristine();
      if (val === PrincipalRepoType.CACHING) {
        this.setPrincipal(this.policy.get('principalRepo') as FormGroup, new CachingPrincipalAttributesRepository());
      }
    });
  }

  formMap(): any {
    return {};
  }

  mapForm(service: AbstractRegisteredService) {
    const type = this.type.value;
    service.attributeReleasePolicy = attributeReleaseFactory(service.attributeReleasePolicy, type);
    this.policy.mapForm(service.attributeReleasePolicy);
    if ((<ChainingFilterForm>this.filter).size() > 0) {
      if ((<ChainingFilterForm>this.filter).size() > 1) {
        this.createFilter(service.attributeReleasePolicy, this.filter);
      } else {
        this.createFilter(service.attributeReleasePolicy, (<ChainingFilterForm>this.filter).atIndex(0));
      }
    }
  }

  addFilter(type: FilterType) {
    if (type === FilterType.REGEX) {
      (<ChainingFilterForm>this.filter).push(new RegexFilterForm(new RegisteredServiceRegexAttributeFilter()));
    }
    if (type === FilterType.SCRIPTED) {
      (<ChainingFilterForm>this.filter).push(new ScriptFilterForm(new RegisteredServiceScriptedAttributeFilter()));
    }
    if (type === FilterType.MUTANT_REGEX) {
      (<ChainingFilterForm>this.filter).push(new MutantMappedFilterForm(new RegisteredServiceMutantRegexAttributeFilter()));
    }
    if (type === FilterType.REVERSE_MAPPED_REGEX) {
      (<ChainingFilterForm>this.filter).push(new ReverseMappedFilterForm(new RegisteredServiceReverseMappedRegexAttributeFilter()));
    }
    if (type === FilterType.MAPPED_REGEX) {
      (<ChainingFilterForm>this.filter).push(new MappedFilterForm(new RegisteredServiceMappedRegexAttributeFilter()));
    }
  }

  createFilter(policy: RegisteredServiceAttributeReleasePolicy, filter: BaseFilterForm<RegisteredServiceAttributeFilter>) {
    policy.attributeFilter = attributeFilterFactory(filter.type);
    (<MgmtFormGroup<RegisteredServiceAttributeFilter>>filter).mapForm(policy.attributeFilter);
  }

  changeType(type: ReleasePolicyType) {
    const base: BaseReleaseForm<RegisteredServiceAttributeReleasePolicy> =
      this.policy as BaseReleaseForm<RegisteredServiceAttributeReleasePolicy>;
    const policy = attributeReleaseFactory(base.policy, type);
    base.mapForm(policy);
    if (type === ReleasePolicyType.RESTFUL) {
      this.policy = new RestfulReleaseForm(policy as ReturnRestfulAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY_SAML) {
      this.policy = new GroovySamlReleaseForm(policy as GroovySamlRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY) {
      this.policy = new GroovyReleaseForm(policy as GroovyScriptAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.SCRIPT) {
      this.policy = new ScriptReleaseForm(policy as ScriptedRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.DENY_ALL) {
      this.policy = new DenyReleaseForm(policy);
    }
    if (type === ReleasePolicyType.RETURN_MAPPED) {
      this.policy = new MappedReleaseForm(policy as ReturnMappedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.METADATA) {
      this.policy = new MetadataReleaseForm(policy as MetadataEntityAttributesAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALLOWED) {
      this.policy = new AllowedReleaseForm(policy as ReturnAllowedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALL) {
      this.policy = new AllReleaseForm(policy);
    }
    this.setControl('policy', this.policy);
  }

  getPolicy(type: ReleasePolicyType): MgmtFormGroup<RegisteredServiceAttributeReleasePolicy> {
    if (type === ReleasePolicyType.RESTFUL) {
      return new RestfulReleaseForm(this.releasePolicy as ReturnRestfulAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY_SAML) {
      return new GroovySamlReleaseForm(this.releasePolicy as GroovySamlRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY) {
      return new GroovyReleaseForm(this.releasePolicy as GroovyScriptAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.SCRIPT) {
      return new ScriptReleaseForm(this.releasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.DENY_ALL) {
      return new DenyReleaseForm(this.releasePolicy as DenyAllAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_MAPPED) {
      return new MappedReleaseForm(this.releasePolicy as ReturnMappedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.METADATA) {
      return new MetadataReleaseForm(this.releasePolicy as MetadataEntityAttributesAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALLOWED) {
      return new AllowedReleaseForm(this.releasePolicy as ReturnAllowedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALL) {
      return new AllReleaseForm(this.releasePolicy as ReturnAllAttributeReleasePolicy);
    }
  }

  getFilter(filter: RegisteredServiceAttributeFilter): BaseFilterForm<RegisteredServiceAttributeFilter> {
    if (RegisteredServiceChainingAttributeFilter.instanceof(filter)) {
      return new ChainingFilterForm(filter as RegisteredServiceChainingAttributeFilter);
    }
    const chain = new ChainingFilterForm(new RegisteredServiceChainingAttributeFilter());
    if (RegisteredServiceRegexAttributeFilter.instanceOf(filter)) {
      chain.push(new RegexFilterForm(filter as RegisteredServiceRegexAttributeFilter));
    }
    if (RegisteredServiceMappedRegexAttributeFilter.instanceof(filter)) {
      chain.push(new MappedFilterForm(filter as RegisteredServiceMappedRegexAttributeFilter));
    }
    if (RegisteredServiceReverseMappedRegexAttributeFilter.instanceof(filter)) {
      chain.push(new ReverseMappedFilterForm(filter as RegisteredServiceReverseMappedRegexAttributeFilter));
    }
    if (RegisteredServiceMutantRegexAttributeFilter.instanceof(filter)) {
      chain.push(new MutantMappedFilterForm(filter as RegisteredServiceMutantRegexAttributeFilter));
    }
    if (RegisteredServiceScriptedAttributeFilter.instanceof(filter)) {
      chain.push(new ScriptFilterForm(filter as RegisteredServiceScriptedAttributeFilter));
    }
    return chain;
  }

  findType(policy: RegisteredServiceAttributeReleasePolicy): ReleasePolicyType {
    if (ReturnAllAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RETURN_ALL;
    }
    if (DenyAllAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.DENY_ALL;
    }
    if (ReturnMappedAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RETURN_MAPPED;
    }
    if (ReturnAllowedAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RETURN_ALLOWED;
    }
    if (ScriptedRegisteredServiceAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.SCRIPT;
    }
    if (GroovyScriptAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.GROOVY;
    }
    if (InCommonRSAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.INCOMMON;
    }
    if (PatternMatchingEntityIdAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.MATCHING;
    }
    if (MetadataEntityAttributesAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.METADATA;
    }
    if (ReturnRestfulAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RESTFUL;
    }
    if (GroovySamlRegisteredServiceAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.GROOVY_SAML;
    }
    return ReleasePolicyType.DENY_ALL;
  }

  setPrincipal(principal: FormGroup, policy: PrincipalAttributesRepository) {
    if (CachingPrincipalAttributesRepository.instanceOf(policy)) {
      principal.get('timeUnit').setValue(policy.timeUnit);
      principal.get('expiration').setValue(policy.expiration);
      principal.get('mergingStrategy').setValue(policy.mergingStrategy);
    } else {
      principal.get('timeUnit').setValue(null);
      principal.get('expiration').setValue(null);
      principal.get('mergingStrategy').setValue(null);
    }
  }
}

