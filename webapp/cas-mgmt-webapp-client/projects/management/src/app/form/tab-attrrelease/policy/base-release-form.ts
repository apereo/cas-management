import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  MgmtFormControl,
  RegisteredServiceAttributeReleasePolicy,
  PrincipalRepoType,
  CachingPrincipalAttributesRepository,
} from 'mgmt-lib';

export abstract class BaseReleaseForm<T extends RegisteredServiceAttributeReleasePolicy>
  extends FormGroup implements MgmtFormGroup<RegisteredServiceAttributeReleasePolicy> {

  constructor(public policy: RegisteredServiceAttributeReleasePolicy) {
    super({
      checks: new FormGroup({
        excludeDefaultAttributes: new MgmtFormControl(null),
        authorizedToReleaseCredentialPassword: new MgmtFormControl(null),
        authorizedToReleaseProxyGrantingTicket: new MgmtFormControl(null),
        authorizedToReleaseAuthenticationAttributes: new MgmtFormControl(null),
        principalIdAttribute: new MgmtFormControl(null)
      }),
      consent: new FormGroup({
        enabled: new MgmtFormControl(null),
        includeOnlyAttributes: new MgmtFormControl(null),
        excludedAttributes: new MgmtFormControl(null)
      }),
      principalRepo: new FormGroup({
        type: new MgmtFormControl(null),
        timeUnit: new MgmtFormControl(null),
        expiration: new MgmtFormControl(null),
        mergingStrategy: new MgmtFormControl(null)
      })
    });
  }

  formMap(): any {
    const policy: RegisteredServiceAttributeReleasePolicy = this.policy;
    const principalRepoType = CachingPrincipalAttributesRepository.instanceOf(policy)
      ? PrincipalRepoType.CACHING
      : PrincipalRepoType.DEFAULT;
    const frm = {
      checks: {
        excludeDefaultAttributes: policy.excludeDefaultAttributes,
        authorizedToReleaseCredentialPassword: policy.authorizedToReleaseCredentialPassword,
        authorizedToReleaseProxyGrantingTicket: policy.authorizedToReleaseProxyGrantingTicket,
        authorizedToReleaseAuthenticationAttributes: policy.authorizedToReleaseAuthenticationAttributes,
        principalIdAttribute: policy.principalIdAttribute
      },
      consent: {
        enabled: policy.consentPolicy.enabled,
        includeOnlyAttributes: policy.consentPolicy.includeOnlyAttributes,
        excludedAttributes: policy.consentPolicy.excludedAttributes
      },
      principalRepo: {
        type: principalRepoType,
        timeUnit: principalRepoType === PrincipalRepoType.CACHING
          ? (<CachingPrincipalAttributesRepository>policy.principalAttributesRepository).timeUnit : null,
        expiration: principalRepoType === PrincipalRepoType.CACHING
          ? (<CachingPrincipalAttributesRepository>policy.principalAttributesRepository).expiration : null,
        mergingStrategy: principalRepoType === PrincipalRepoType.CACHING
          ? (<CachingPrincipalAttributesRepository>policy.principalAttributesRepository).mergingStrategy : null
      }
    };
    return frm;
  }

  mapForm(service: RegisteredServiceAttributeReleasePolicy) {
    const frm = this.value;
    service.excludeDefaultAttributes = frm.checks.excludeDefaultAttributes;
    service.authorizedToReleaseCredentialPassword = frm.checks.authorizedToReleaseCredentialPassword;
    service.authorizedToReleaseProxyGrantingTicket = frm.checks.authorizedToReleaseProxyGrantingTicket;
    service.authorizedToReleaseAuthenticationAttributes = frm.checks.authorizedToReleaseAuthenticationAttributes;
    service.principalIdAttribute = frm.checks.principalIdAttribute;
    service.consentPolicy.enabled = frm.consent.enabled;
    service.consentPolicy.includeOnlyAttributes = frm.consent.includeOnlyAttributes;
    service.consentPolicy.excludedAttributes = frm.consent.excludedAttributes;
    if (frm.principalRepo.type === PrincipalRepoType.CACHING) {
      (<CachingPrincipalAttributesRepository>service.principalAttributesRepository).timeUnit = frm.principalRepo.timeUnit;
      (<CachingPrincipalAttributesRepository>service.principalAttributesRepository).expiration = frm.principalRepo.expiration;
      (<CachingPrincipalAttributesRepository>service.principalAttributesRepository).mergingStrategy = frm.principalRepo.mergingStrategy;
    }
  }
}
