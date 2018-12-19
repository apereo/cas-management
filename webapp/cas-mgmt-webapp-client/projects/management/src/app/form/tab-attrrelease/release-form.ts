import {FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  CachingPrincipalAttributesRepository,
  DenyAllAttributeReleasePolicy,
  GroovySamlRegisteredServiceAttributeReleasePolicy,
  GroovyScriptAttributeReleasePolicy,
  InCommonRSAttributeReleasePolicy,
  MetadataEntityAttributesAttributeReleasePolicy,
  MgmtFormControl,
  MgmtFormGroup,
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
  WsFederationClaimsReleasePolicy,
  FilterType,
  RegisteredServiceAttributeFilter,
  RegisteredServiceChainingAttributeFilter,
  RegisteredServiceMappedRegexAttributeFilter,
  RegisteredServiceMutantRegexAttributeFilter,
  RegisteredServiceRegexAttributeFilter,
  RegisteredServiceReverseMappedRegexAttributeFilter,
  RegisteredServiceScriptedAttributeFilter
} from 'mgmt-lib';
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
import {WsFedReleaseForm} from './policy/wsfed-form';
import {RegexFilterForm} from './filter/regex-filter-form';
import {MappedFilterForm} from './filter/mapped-filter-form';
import {ReverseMappedFilterForm} from './filter/reverse-mapped-filter-form';
import {MutantMappedFilterForm} from './filter/mutant-mapped-filter-form';
import {ScriptFilterForm} from './filter/script-filter-form';
import {ChainingFilterForm} from './filter/chaining-filter-form';
import {BaseFilterForm} from './filter/filter-form';

export class ReleaseForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  policy: MgmtFormGroup<RegisteredServiceAttributeReleasePolicy>;
  filter: BaseFilterForm<RegisteredServiceAttributeFilter>;

  constructor(public data: RegisteredServiceAttributeReleasePolicy, public isWsFed?: boolean) {
    super({});
    const type = this.findType(data);
    this.type = new MgmtFormControl(type);
    this.policy = this.getPolicy(type);
    this.filter = this.getFilter(data.attributeFilter);
    this.addControl('type', this.type);
    this.addControl('policy', this.policy);
    this.addControl('filter', this.filter);
    this.type.valueChanges.subscribe(t => this.changeType(t));
    if (type !== ReleasePolicyType.WS_FED) {
      this.policy.get('principalRepo').get('type').valueChanges.subscribe(val => {
        this.policy.get('principalRepo').markAsPristine();
        if (val === PrincipalRepoType.CACHING) {
          this.setPrincipal(this.policy.get('principalRepo') as FormGroup, new CachingPrincipalAttributesRepository());
        }
      });
    }
  }

  formMap(): any {
    return {};
  }

  mapForm(service: AbstractRegisteredService) {
    const type = this.type.value;
    if (type === ReleasePolicyType.RESTFUL) {
      service.attributeReleasePolicy = new ReturnRestfulAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.GROOVY_SAML) {
      service.attributeReleasePolicy = new GroovySamlRegisteredServiceAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.GROOVY) {
      service.attributeReleasePolicy = new GroovyScriptAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.SCRIPT) {
      service.attributeReleasePolicy = new ScriptedRegisteredServiceAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.DENY_ALL) {
      service.attributeReleasePolicy = new DenyAllAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.RETURN_MAPPED) {
      service.attributeReleasePolicy = new ReturnMappedAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.METADATA) {
      service.attributeReleasePolicy = new MetadataEntityAttributesAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.RETURN_ALLOWED) {
      service.attributeReleasePolicy = new ReturnAllowedAttributeReleasePolicy();
    }
    if (type === ReleasePolicyType.RETURN_ALL) {
      service.attributeReleasePolicy = new ReturnAllAttributeReleasePolicy();
    }
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
    if (filter.type === FilterType.CHAINING) {
      policy.attributeFilter = new RegisteredServiceChainingAttributeFilter();
    }
    if (filter.type === FilterType.REGEX) {
      policy.attributeFilter = new RegisteredServiceRegexAttributeFilter();
    }
    if (filter.type === FilterType.SCRIPTED) {
      policy.attributeFilter = new RegisteredServiceScriptedAttributeFilter();
    }
    if (filter.type === FilterType.MAPPED_REGEX) {
      policy.attributeFilter = new RegisteredServiceMappedRegexAttributeFilter();
    }
    if (filter.type === FilterType.REVERSE_MAPPED_REGEX) {
      policy.attributeFilter = new RegisteredServiceReverseMappedRegexAttributeFilter();
    }
    if (filter.type === FilterType.MUTANT_REGEX) {
      policy.attributeFilter = new RegisteredServiceMutantRegexAttributeFilter();
    }
    (<MgmtFormGroup<RegisteredServiceAttributeFilter>>filter).mapForm(policy.attributeFilter);
  }

  changeType(type: ReleasePolicyType) {
    const base: BaseReleaseForm<RegisteredServiceAttributeReleasePolicy> = this.policy as BaseReleaseForm<RegisteredServiceAttributeReleasePolicy>;
    if (type === ReleasePolicyType.RESTFUL) {
      const policy = new ReturnRestfulAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new RestfulReleaseForm(policy);
    }
    if (type === ReleasePolicyType.GROOVY_SAML) {
      const policy = new GroovySamlRegisteredServiceAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new GroovySamlReleaseForm(policy);
    }
    if (type === ReleasePolicyType.GROOVY) {
      const policy = new GroovyScriptAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new GroovyReleaseForm(policy);
    }
    if (type === ReleasePolicyType.SCRIPT) {
      const policy = new ScriptedRegisteredServiceAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new ScriptReleaseForm(policy);
    }
    if (type === ReleasePolicyType.DENY_ALL) {
      const policy = new DenyAllAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new DenyReleaseForm(policy);
    }
    if (type === ReleasePolicyType.RETURN_MAPPED) {
      const policy = new ReturnMappedAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new MappedReleaseForm(policy);
    }
    if (type === ReleasePolicyType.METADATA) {
      const policy = new MetadataEntityAttributesAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new MetadataReleaseForm(policy);
    }
    if (type === ReleasePolicyType.RETURN_ALLOWED) {
      const policy = new ReturnAllowedAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new AllowedReleaseForm(policy);
    }
    if (type === ReleasePolicyType.RETURN_ALL) {
      const policy = new ReturnAllAttributeReleasePolicy();
      base.mapForm(policy);
      this.policy = new AllReleaseForm(policy);
    }
  }

  getPolicy(type: ReleasePolicyType): MgmtFormGroup<RegisteredServiceAttributeReleasePolicy> {
    if (type === ReleasePolicyType.RESTFUL) {
      return new RestfulReleaseForm(this.data as ReturnRestfulAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY_SAML) {
      return new GroovySamlReleaseForm(this.data as GroovySamlRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY) {
      return new GroovyReleaseForm(this.data as GroovyScriptAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.SCRIPT) {
      return new ScriptReleaseForm(this.data as ScriptedRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.DENY_ALL) {
      return new DenyReleaseForm(this.data as DenyAllAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_MAPPED) {
      return new MappedReleaseForm(this.data as ReturnMappedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.METADATA) {
      return new MetadataReleaseForm(this.data as MetadataEntityAttributesAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALLOWED) {
      return new AllowedReleaseForm(this.data as ReturnAllowedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALL) {
      return new AllReleaseForm(this.data as ReturnAllAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.WS_FED) {
      return new WsFedReleaseForm(this.data as WsFederationClaimsReleasePolicy);
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
    if (this.isWsFed || WsFederationClaimsReleasePolicy.instanceOf(policy)){
      return ReleasePolicyType.WS_FED;
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

