import {AbstractControl, FormArray, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {
  AbstractRegisteredService,
  CachingPrincipalAttributesRepository,
  DataRecord,
  DenyAllAttributeReleasePolicy,
  FilterType,
  GroovySamlRegisteredServiceAttributeReleasePolicy,
  GroovyScriptAttributeReleasePolicy,
  InCommonRSAttributeReleasePolicy,
  MetadataEntityAttributesAttributeReleasePolicy,
  MgmtFormControl,
  MgmtFormGroup,
  PatternMatchingEntityIdAttributeReleasePolicy,
  PrincipalRepoType,
  RegisteredServiceAttributeFilter,
  RegisteredServiceAttributeReleasePolicy,
  RegisteredServiceChainingAttributeFilter,
  RegisteredServiceMappedRegexAttributeFilter,
  RegisteredServiceMutantRegexAttributeFilter,
  RegisteredServiceRegexAttributeFilter,
  RegisteredServiceReverseMappedRegexAttributeFilter,
  RegisteredServiceScriptedAttributeFilter,
  ReleasePolicyType,
  ReturnAllAttributeReleasePolicy,
  ReturnAllowedAttributeReleasePolicy,
  ReturnMappedAttributeReleasePolicy,
  ReturnRestfulAttributeReleasePolicy,
  ScriptedRegisteredServiceAttributeReleasePolicy,
  WsFederationClaimsReleasePolicy,
  WSFederationRegisterdService
} from 'mgmt-lib';
import {MultiauthForm} from '../tab-mulitauth/multiauth-form';

export class ReleaseForm extends MgmtFormGroup {

  static policyType: ReleasePolicyType = ReleasePolicyType.DENY_ALL;
  static principalType: PrincipalRepoType = PrincipalRepoType.DEFAULT;

  constructor(public data: DataRecord) {
    super();
    const policy = this.data.service.attributeReleasePolicy;
    const type = this.type(policy);
    const mapped = new FormArray([]);
    if (type === ReleasePolicyType.RETURN_MAPPED
       && (<ReturnMappedAttributeReleasePolicy>policy).allowedAttributes) {
      for (let i = 0; i < Object.keys((<ReturnMappedAttributeReleasePolicy>policy).allowedAttributes).length; i++) {
        mapped.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    const filters = new FormArray([]);
    if (RegisteredServiceChainingAttributeFilter.instanceof(policy.attributeFilter)
        && (<RegisteredServiceChainingAttributeFilter>policy.attributeFilter)) {
      for (let f of (<RegisteredServiceChainingAttributeFilter>policy.attributeFilter).filters) {
        filters.push(this.filterDef(f));
      }
    } else if (policy.attributeFilter) {
      filters.push(this.filterDef(policy.attributeFilter));
    }
    const claims = new FormArray([]);
    if (WSFederationRegisterdService.instanceOf(this.data.service)
       && (<WsFederationClaimsReleasePolicy>policy).allowedAttributes) {
      for (let i = 0; i < Object.keys((<WsFederationClaimsReleasePolicy>policy).allowedAttributes).length; i++) {
        claims.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    this.form = new FormGroup({
      checks: new FormGroup({
        excludeDefaultAttributes: new MgmtFormControl(null),
        authorizedToReleaseCredentialPassword: new MgmtFormControl(null),
        authorizedToReleaseProxyGrantingTicket: new MgmtFormControl(null),
        authorizedToReleaseAuthenticationAttributes: new MgmtFormControl(null)
      }),
      policies: new FormGroup({
        type: new MgmtFormControl(null),
        allowed: new MgmtFormControl(null),
        script: new MgmtFormControl(null, null, this.condtionalReq(ReleasePolicyType.SCRIPT)),
        groovy: new MgmtFormControl(null, null, this.condtionalReq(ReleasePolicyType.GROOVY)),
        groovySaml: new MgmtFormControl(null, null, this.condtionalReq(ReleasePolicyType.GROOVY_SAML)),
        mapped: new FormGroup({
          attributes: mapped
        }),
        metadata: new FormGroup({
          entityAttributeValues: new MgmtFormControl(null),
          entityAttributeFormat: new MgmtFormControl(null),
          entityAttribute: new MgmtFormControl(null)
        }),
        restful: new MgmtFormControl(null, null, this.condtionalReq(ReleasePolicyType.RESTFUL)),
      }),
      consent: new FormGroup({
        enabled: new MgmtFormControl(null),
        includeOnlyAttributes: new MgmtFormControl(null),
        excludedAttributes: new MgmtFormControl(null)
      }),
      principalRepo: new FormGroup({
        type: new MgmtFormControl(null),
        timeUnit: new MgmtFormControl(null, null, this.principalRequired(PrincipalRepoType.CACHING)),
        expiration: new MgmtFormControl(null),
        mergingStrategy: new MgmtFormControl(null, null, this.principalRequired(PrincipalRepoType.CACHING))
      }),
      attributeFilter: new FormGroup({
        filters: filters
      }),
      wsfed: new FormGroup({
        attributes: claims
      })
    });
    this.form.get('policies').get('type').valueChanges.subscribe(t => {
      MultiauthForm.policyType = t;
    })
    this.form.setValue(this.formMap());
  }

  filterDef(filter: RegisteredServiceAttributeFilter): FormGroup {
    const type = this.filterType(filter);
    if (type === FilterType.REGEX) {
      return new FormGroup({
        type: new MgmtFormControl(FilterType.REGEX),
        pattern: new MgmtFormControl(null),
        order: new MgmtFormControl(null)
      });
    }
    if (type === FilterType.REVERSE_MAPPED_REGEX || type === FilterType.MAPPED_REGEX || type === FilterType.MUTANT_REGEX) {
      const patternArray = new FormArray([]);
      if (<RegisteredServiceMappedRegexAttributeFilter>filter) {
        for (let p of Array.from(Object.keys((<RegisteredServiceMappedRegexAttributeFilter>filter).patterns))) {
          patternArray.push(new FormGroup({
            key: new MgmtFormControl(null),
            value: new MgmtFormControl(null)
          }));
        }
      }
      const mapped = new FormGroup({
        type: new MgmtFormControl(type),
        patterns: patternArray,
        caseInsensitive: new MgmtFormControl(null),
        completeMatch: new MgmtFormControl(null),
        excludeUnmappedAttributes: new MgmtFormControl(null),
        order: new MgmtFormControl(null)
      });

      return mapped;
    }
    if (RegisteredServiceScriptedAttributeFilter.instanceof(filter)) {
      return new FormGroup({
        type: new MgmtFormControl(FilterType.SCRIPTED),
        script: new MgmtFormControl(null),
        order: new MgmtFormControl(null)
      });
    }
  }

  formMap(): any {
    const policy: RegisteredServiceAttributeReleasePolicy = this.data.service.attributeReleasePolicy;
    const type = this.type(policy);
    const principalRepoType = CachingPrincipalAttributesRepository.instanceOf(policy) ? PrincipalRepoType.CACHING : PrincipalRepoType.DEFAULT;
    const frm = {
      checks: {
        excludeDefaultAttributes: policy.excludeDefaultAttributes,
        authorizedToReleaseCredentialPassword: policy.authorizedToReleaseCredentialPassword,
        authorizedToReleaseProxyGrantingTicket: policy.authorizedToReleaseProxyGrantingTicket,
        authorizedToReleaseAuthenticationAttributes: policy.authorizedToReleaseAuthenticationAttributes
      },
      policies: {
        type: type,
        allowed: type === ReleasePolicyType.RETURN_ALLOWED ? (<ReturnAllowedAttributeReleasePolicy>policy).allowedAttributes : null,
        script: type === ReleasePolicyType.SCRIPT ? (<ScriptedRegisteredServiceAttributeReleasePolicy>policy).scriptFile : null,
        groovy: type === ReleasePolicyType.GROOVY ? (<GroovyScriptAttributeReleasePolicy>policy).groovyScript : null,
        groovySaml: type === ReleasePolicyType.GROOVY_SAML ? (<GroovySamlRegisteredServiceAttributeReleasePolicy>policy).groovyScript : null,
        mapped: {
          attributes: []
        },
        metadata: {
          entityAttributeValues: type === ReleasePolicyType.METADATA ? (<MetadataEntityAttributesAttributeReleasePolicy>policy).entityAttributeValues : null,
          entityAttributeFormat: type === ReleasePolicyType.METADATA ? (<MetadataEntityAttributesAttributeReleasePolicy>policy).entityAttributeFormat : null,
          entityAttribute: type === ReleasePolicyType.METADATA ? (<MetadataEntityAttributesAttributeReleasePolicy>policy).entityAttribute : null
        },
        restful: type === ReleasePolicyType.RESTFUL ? (<ReturnRestfulAttributeReleasePolicy>policy).endpoint : null
      },
      consent: {
        enabled: policy.consentPolicy.enabled,
        includeOnlyAttributes: policy.consentPolicy.includeOnlyAttributes,
        excludedAttributes: policy.consentPolicy.excludedAttributes
      },
      principalRepo: {
        type: principalRepoType,
        timeUnit: principalRepoType === PrincipalRepoType.CACHING ? (<CachingPrincipalAttributesRepository>policy.principalAttributesRepository).timeUnit : null,
        expiration: principalRepoType === PrincipalRepoType.CACHING ? (<CachingPrincipalAttributesRepository>policy.principalAttributesRepository).expiration : null,
        mergingStrategy: principalRepoType === PrincipalRepoType.CACHING ? (<CachingPrincipalAttributesRepository>policy.principalAttributesRepository).mergingStrategy : null
      },
      attributeFilter: {
        filters: []
      },
      wsfed: {
        attributes: []
      }
    };
    if (type === ReleasePolicyType.RETURN_MAPPED
       && (<ReturnMappedAttributeReleasePolicy>policy).allowedAttributes) {
      for (let a of Array.from(Object.keys((<ReturnMappedAttributeReleasePolicy>policy).allowedAttributes))) {
        frm.policies.mapped.attributes.push({
          key: a,
          value: (<ReturnMappedAttributeReleasePolicy>policy).allowedAttributes[a].toString()
        });
      }
    }
    if (RegisteredServiceChainingAttributeFilter.instanceof(policy.attributeFilter)
        && (<RegisteredServiceChainingAttributeFilter>policy.attributeFilter).filters) {
      for (let f of (<RegisteredServiceChainingAttributeFilter>policy.attributeFilter).filters) {
        frm.attributeFilter.filters.push(this.createFilter(f));
      }
    } else if (policy.attributeFilter) {
      frm.attributeFilter.filters.push(this.createFilter(policy.attributeFilter));
    }
    if (WSFederationRegisterdService.instanceOf(this.data.service)
       && (<WsFederationClaimsReleasePolicy>policy).allowedAttributes) {
      for (let c of Array.from(Object.keys((<WsFederationClaimsReleasePolicy>policy).allowedAttributes))) {
        frm.wsfed.attributes.push({
          key: c,
          value: (<WsFederationClaimsReleasePolicy>policy).allowedAttributes[c].toString()
        });
      }
    }
    return frm;
  }

  createFilter(filter: RegisteredServiceAttributeFilter) {
    const type = this.filterType(filter);
    if (type === FilterType.REGEX) {
      return {
        type: FilterType.REGEX,
        pattern: (<RegisteredServiceRegexAttributeFilter>filter).pattern,
        order: (<RegisteredServiceRegexAttributeFilter>filter).order
      }
    }
    if (type === FilterType.REVERSE_MAPPED_REGEX || type === FilterType.MAPPED_REGEX || type === FilterType.MUTANT_REGEX) {
      const mapped = {
        type: type,
        patterns: [],
        caseInsensitive: (<RegisteredServiceMappedRegexAttributeFilter>filter).caseInsensitive,
        completeMatch: (<RegisteredServiceMappedRegexAttributeFilter>filter).completeMatch,
        excludeUnmappedAttributes: (<RegisteredServiceMappedRegexAttributeFilter>filter).excludeUnmappedAttributes,
        order: (<RegisteredServiceMappedRegexAttributeFilter>filter).order
      }
      if ((<RegisteredServiceMappedRegexAttributeFilter>filter).patterns) {
        for (let p of Array.from(Object.keys((<RegisteredServiceMappedRegexAttributeFilter>filter).patterns))) {
          mapped.patterns.push({
            key: p,
            value: (<RegisteredServiceMappedRegexAttributeFilter>filter).patterns[p].toString()
          });
        }
      }
      return mapped;
    }
    if (RegisteredServiceScriptedAttributeFilter.instanceof(filter)) {
      return {
        type: FilterType.SCRIPTED,
        script: (<RegisteredServiceScriptedAttributeFilter>filter).script,
        order: (<RegisteredServiceScriptedAttributeFilter>filter).order
      }
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    service.attributeReleasePolicy = new DenyAllAttributeReleasePolicy(service.attributeReleasePolicy);
    if (frm.policies.type === ReleasePolicyType.RETURN_ALLOWED) {
      service.attributeReleasePolicy = new ReturnAllowedAttributeReleasePolicy(service.attributeReleasePolicy);
      (<ReturnAllowedAttributeReleasePolicy>service.attributeReleasePolicy).allowedAttributes = frm.policies.allowed;
    }
    if (frm.policies.type === ReleasePolicyType.SCRIPT) {
      service.attributeReleasePolicy = new ScriptedRegisteredServiceAttributeReleasePolicy(service.attributeReleasePolicy);
      (<ScriptedRegisteredServiceAttributeReleasePolicy>service.attributeReleasePolicy).scriptFile = frm.policies.script;
    }
    if (frm.policies.type === ReleasePolicyType.GROOVY) {
      service.attributeReleasePolicy = new GroovyScriptAttributeReleasePolicy(service.attributeReleasePolicy);
      (<GroovyScriptAttributeReleasePolicy>service.attributeReleasePolicy).groovyScript = frm.policies.groovy;
    }
    if (frm.policies.type === ReleasePolicyType.GROOVY_SAML) {
      service.attributeReleasePolicy = new GroovySamlRegisteredServiceAttributeReleasePolicy(service.attributeReleasePolicy);
      (<GroovySamlRegisteredServiceAttributeReleasePolicy>service.attributeReleasePolicy).groovyScript = frm.policies.groovySaml;
    }
    if (frm.policies.type === ReleasePolicyType.RETURN_MAPPED) {
      service.attributeReleasePolicy = new ReturnMappedAttributeReleasePolicy(service.attributeReleasePolicy);
      if (frm.policies.mapped.attributes) {
        (<ReturnMappedAttributeReleasePolicy>service.attributeReleasePolicy).allowedAttributes = new Map<String, String[]>();
        for (let c of frm.policies.mapped.attributes) {
          (<ReturnMappedAttributeReleasePolicy>service.attributeReleasePolicy).allowedAttributes[c.key] = c.value.split(",");
        }
      }
    }
    if (frm.policies.type === ReleasePolicyType.METADATA) {
      service.attributeReleasePolicy = new MetadataEntityAttributesAttributeReleasePolicy(service.attributeReleasePolicy);
      (<MetadataEntityAttributesAttributeReleasePolicy>service.attributeReleasePolicy).entityAttributeValues = frm.policies.metadata.entityAttributeValues;
      (<MetadataEntityAttributesAttributeReleasePolicy>service.attributeReleasePolicy).entityAttributeFormat = frm.policies.metadata.entityAttributeFormat;
      (<MetadataEntityAttributesAttributeReleasePolicy>service.attributeReleasePolicy).entityAttribute = frm.policies.metadata.entityAttribute;
    }
    if (frm.policies.type === ReleasePolicyType.RESTFUL) {
      service.attributeReleasePolicy = new ReturnRestfulAttributeReleasePolicy(service.attributeReleasePolicy);
      (<ReturnRestfulAttributeReleasePolicy>service.attributeReleasePolicy).endpoint = frm.policies.restful
    }
    service.attributeReleasePolicy.excludeDefaultAttributes = frm.checks.excludeDefaultAttributes;
    service.attributeReleasePolicy.authorizedToReleaseCredentialPassword = frm.checks.authorizedToReleaseCredentialPassword;
    service.attributeReleasePolicy.authorizedToReleaseProxyGrantingTicket = frm.checks.authorizedToReleaseProxyGrantingTicket;
    service.attributeReleasePolicy.authorizedToReleaseAuthenticationAttributes = frm.checks.authorizedToReleaseAuthenticationAttributes;
    service.attributeReleasePolicy.consentPolicy.enabled = frm.consent.enabled;
    service.attributeReleasePolicy.consentPolicy.includeOnlyAttributes = frm.consent.includeOnlyAttributes;
    service.attributeReleasePolicy.consentPolicy.excludedAttributes = frm.consent.excludedAttributes;
    if (frm.principalRepo.type === PrincipalRepoType.CACHING) {
      (<CachingPrincipalAttributesRepository>service.attributeReleasePolicy.principalAttributesRepository).timeUnit = frm.principalRepo.timeUnit;
      (<CachingPrincipalAttributesRepository>service.attributeReleasePolicy.principalAttributesRepository).expiration = frm.principalRepo.expiration;
      (<CachingPrincipalAttributesRepository>service.attributeReleasePolicy.principalAttributesRepository).mergingStrategy = frm.principalRepo.mergingStrategy;
    }
    if (frm.attributeFilter.filters) {
      if (frm.attributeFilter.filters.length == 1) {
        service.attributeReleasePolicy.attributeFilter = this.mapFilter(frm.attributeFilter.filters[0]);
      } else {
        service.attributeReleasePolicy.attributeFilter = new RegisteredServiceChainingAttributeFilter();
        for (let f of frm.attributeFilter.filters) {
          (<RegisteredServiceChainingAttributeFilter>service.attributeReleasePolicy.attributeFilter).filters.push(this.mapFilter(f));
        }
      }
    }
  }

  mapFilter(filter: any) {
    if (filter.type === FilterType.REGEX) {
      const mf = new RegisteredServiceRegexAttributeFilter();
      mf.pattern = filter.pattern;
      mf.order = filter.order;
      return mf;
    }
    if (filter.type === FilterType.MUTANT_REGEX || filter.type === FilterType.REVERSE_MAPPED_REGEX || filter.type == FilterType.MAPPED_REGEX) {
      let mf: RegisteredServiceMappedRegexAttributeFilter | RegisteredServiceReverseMappedRegexAttributeFilter | RegisteredServiceMutantRegexAttributeFilter;
      if (filter.type === FilterType.MAPPED_REGEX) {
        mf = new RegisteredServiceMappedRegexAttributeFilter();
      } else if (filter.type === FilterType.REVERSE_MAPPED_REGEX) {
        mf = new RegisteredServiceReverseMappedRegexAttributeFilter();
      } else {
        mf = new RegisteredServiceMutantRegexAttributeFilter();
      }
      if (filter.patterns) {
        mf.patterns = new Map<String, String>();
        for (let c of filter.patterns) {
          mf.patterns[c.key] = c.value;
        }
      }
      mf.caseInsensitive = filter.caseInsensitive;
      mf.completeMatch = filter.completeMatch;
      mf.excludeUnmappedAttributes = filter.excludeUnmappedAttributes;
      mf.order = filter.order;
      return mf;
    }
    const mf = new RegisteredServiceScriptedAttributeFilter();
    mf.script = filter.script;
    mf.order = filter.order;
    return mf;
  }

  type(policy: RegisteredServiceAttributeReleasePolicy): ReleasePolicyType {
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

    filterType(filter: RegisteredServiceAttributeFilter): FilterType {
      if (RegisteredServiceScriptedAttributeFilter.instanceof(filter)) {
        return FilterType.SCRIPTED;
      }
      if (RegisteredServiceMutantRegexAttributeFilter.instanceof(filter)) {
        return FilterType.MUTANT_REGEX;
      }
      if (RegisteredServiceMappedRegexAttributeFilter.instanceof(filter)) {
        return FilterType.MAPPED_REGEX;
      }
      if (RegisteredServiceReverseMappedRegexAttributeFilter.instanceof(filter)) {
        return FilterType.REVERSE_MAPPED_REGEX;
      }
      return FilterType.REGEX;
    }

  condtionalReq(type: ReleasePolicyType): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (ReleaseForm.policyType === type) {
        return control.value == null || control.value.length === 0 ? {'required': true } : null;
      }
      return null;
    };
  }

  principalRequired(type: PrincipalRepoType): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} | null => {
      if (ReleaseForm.principalType == type) {
        return control.value == null || control.value.length === 0 ? {'required': true } : null;
      }
      return null;
    }
  }
}
