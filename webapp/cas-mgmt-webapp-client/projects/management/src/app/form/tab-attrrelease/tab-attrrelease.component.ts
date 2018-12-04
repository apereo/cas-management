import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ReleaseForm} from './release-form';
import {
  OidcRegisteredService,
  WSFederationRegisterdService,
  DataRecord,
  CachingPrincipalAttributesRepository,
  PrincipalRepoType,
  MetadataEntityAttributesAttributeReleasePolicy,
  RegisteredServiceAttributeReleasePolicy,
  ReleasePolicyType,
  RegisteredServiceConsentPolicy,
  PrincipalAttributesRepository
} from 'mgmt-lib';

@Component({
  selector: 'app-tab-attrrelease',
  templateUrl: './tab-attrrelease.component.html'
})
export class TabAttrreleaseComponent {
  isOidc: boolean;
  isWsFed: boolean;
  oidcService: OidcRegisteredService;
  attributeRelease: ReleaseForm;

  constructor(public data: DataRecord) {
   this.isOidc = OidcRegisteredService.instanceOf(this.data.service);
   this.isWsFed = WSFederationRegisterdService.instanceOf(this.data.service);
   if (this.isOidc) {
     this.oidcService = this.data.service as OidcRegisteredService;
   }
   if (this.data.formMap.has('attributeRelease')) {
     this.attributeRelease = this.data.formMap.get('attributeRelease') as ReleaseForm;
     return;
   }
   this.attributeRelease = new ReleaseForm(this.data);
   this.attributeRelease.get('policies').get('type').valueChanges.subscribe(val => {
     const policies = this.attributeRelease.get('policies');
     policies.get('script').markAsPristine();
     policies.get('groovy').markAsPristine();
     policies.get('groovySaml').markAsPristine();
     policies.get('restful').markAsPristine();
     if (val === ReleasePolicyType.RETURN_ALL) {
       policies.get('allowed').setValue(null);
     }
     if (val === ReleasePolicyType.SCRIPT) {
       policies.get('script').setValue(null);
     }
     if (val === ReleasePolicyType.GROOVY) {
       policies.get('groovy').setValue(null);
     }
     if (val === ReleasePolicyType.GROOVY_SAML) {
       policies.get('groovySaml').setValue(null);
     }
     if (val === ReleasePolicyType.RETURN_MAPPED) {
       policies.get('mapped').setValue(null);
     }
     if (val === ReleasePolicyType.METADATA) {
       this.setMetadata(policies.get('metadata') as FormGroup, new MetadataEntityAttributesAttributeReleasePolicy());
     }
     if (val === ReleasePolicyType.RESTFUL) {
       policies.get('restful').setValue(null);
     }
   });

   this.attributeRelease.get('principalRepo').get('type').valueChanges.subscribe( val => {
     this.attributeRelease.get('principalRepo').markAsPristine();
     if (val === PrincipalRepoType.CACHING) {
       this.setPrincipal(this.attributeRelease.get('principalRepo') as FormGroup, new CachingPrincipalAttributesRepository());
     }
   });
   this.data.formMap.set('attributeRelease', this.attributeRelease);
  }

  setMetadata(metadata: FormGroup, policy: MetadataEntityAttributesAttributeReleasePolicy) {
    metadata.get('entityAttributeValues').setValue(policy.entityAttributeValues);
    metadata.get('entityAttributeFormat').setValue(policy.entityAttributeFormat);
    metadata.get('entityAttribute').setValue(policy.entityAttribute);
  }

  setConsent(consent: FormGroup, policy: RegisteredServiceConsentPolicy) {
    consent.get('enabled').setValue(policy.enabled);
    consent.get('includeOnlyAttributes').setValue(policy.includeOnlyAttributes);
    consent.get('excludedAttributes').setValue(policy.excludedAttributes);
  }

  setChecks(checks: FormGroup, policy: RegisteredServiceAttributeReleasePolicy) {
    checks.get('excludeDefaultAttributes').setValue(policy.excludeDefaultAttributes);
    checks.get('authorizedToReleaseCredentialPassword').setValue(policy.authorizedToReleaseCredentialPassword);
    checks.get('authorizedToReleaseProxyGrantingTicket').setValue(policy.authorizedToReleaseProxyGrantingTicket);
    checks.get('authorizedToReleaseAuthenticationAttributes').setValue(policy.authorizedToReleaseAuthenticationAttributes);
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
