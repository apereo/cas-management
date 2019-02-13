import {FormArray, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  DefaultRegisteredServiceMultifactorPolicy,
  RegisteredServiceMultifactorPolicy,
  DefaultRegisteredServiceContact,
  SamlRegisteredService,
  LdapSamlRegisteredServiceAttributeReleasePolicy
} from 'mgmt-lib';

export class SamlForm extends FormGroup implements MgmtFormGroup<SamlRegisteredService> {

  constructor(private data: DataRecord) {
    super({
      basics: new FormGroup({
        serviceId: new MgmtFormControl(null, null, Validators.required),
        name: new MgmtFormControl(null, null, Validators.required),
        description: new MgmtFormControl(null)
      }),
      contacts: new FormArray([], {validators: Validators.required}),
      advanced: new FormGroup({
        requiresDuo: new MgmtFormControl(null),
        ssoEnabled: new MgmtFormControl(null),
        logoutType: new MgmtFormControl(null),
        logoutUrl: new MgmtFormControl(null)
      }, {validators: logoutUrlRequired }),
      saml: new FormGroup({
        metadata: new FormGroup({
          location: new MgmtFormControl(null, null, Validators.required),
        }),
        nameId: new FormGroup({
          requiredNameIdFormat: new MgmtFormControl(null),
        }),
        optionalSaml: new FormGroup({
          skipGeneratingAssertionNameId: new MgmtFormControl(null),
          skipGeneratingSubjectConfirmationInResponseTo: new MgmtFormControl(null),
          skipGeneratingSubjectConfirmationNotOnOrAfter: new MgmtFormControl(null),
          skipGeneratingSubjectConfirmationRecipient: new MgmtFormControl(null),
          skipGeneratingSubjectConfirmationNotBefore: new MgmtFormControl(null),
        }),
        security: new FormGroup({
          signAssertions: new MgmtFormControl(null),
          signResponses: new MgmtFormControl(null),
          encryptAssertions: new MgmtFormControl(null),
          signingCredentialType: new MgmtFormControl(null),
          requiredAuthenticationContextClass: new MgmtFormControl(null),
          assertionAudiences: new MgmtFormControl(null)
        })
      }),
      attributes: new FormGroup({
        attributes: new FormArray([])
      })
    });
    const contacts = this.get('contacts') as FormArray;
    if (this.data.service.contacts) {
      for (let i = 0; i < this.data.service.contacts.length; i++) {
        contacts.push(new FormGroup({
          name: new MgmtFormControl(null, null, Validators.required),
          email: new MgmtFormControl(null, null, Validators.required),
          phone: new MgmtFormControl(null),
          department: new MgmtFormControl(null)
        }));
      }
    }
    const policy = this.data.service.attributeReleasePolicy as LdapSamlRegisteredServiceAttributeReleasePolicy;
    const attrs = this.get('attributes').get('attributes') as FormArray;
    if (policy.allowedAttributes) {
      for (let i = 0; i < Object.keys(policy.allowedAttributes).length; i++) {
        attrs.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    this.setValue(this.formMap());
  }

  formMap(): any {
    const srv: SamlRegisteredService = this.data.service as SamlRegisteredService;
    const frm =  {
      basics: {
        serviceId: srv.serviceId || 'https://',
        name: srv.name,
        description: srv.description
      },
      contacts: [],
      advanced: {
        requiresDuo: this.requiresDuo(srv.multifactorPolicy),
        ssoEnabled: srv.accessStrategy.ssoEnabled,
        logoutType: srv.logoutType,
        logoutUrl: srv.logoutUrl
      },
      saml: {
        metadata: {
          location: srv.metadataLocation,
        },
        nameId: {
          requiredNameIdFormat: srv.requiredNameIdFormat,
        },
        optionalSaml: {
          skipGeneratingAssertionNameId: srv.skipGeneratingAssertionNameId,
          skipGeneratingSubjectConfirmationInResponseTo: srv.skipGeneratingSubjectConfirmationInResponseTo,
          skipGeneratingSubjectConfirmationNotOnOrAfter: srv.skipGeneratingSubjectConfirmationNotOnOrAfter,
          skipGeneratingSubjectConfirmationRecipient: srv.skipGeneratingSubjectConfirmationRecipient,
          skipGeneratingSubjectConfirmationNotBefore: srv.skipGeneratingSubjectConfirmationNotBefore,
        },
        security: {
          signAssertions: srv.signAssertions,
          signResponses: srv.signResponses,
          encryptAssertions: srv.encryptAssertions,
          signingCredentialType: srv.signingCredentialType,
          requiredAuthenticationContextClass: srv.requiredAuthenticationContextClass,
          assertionAudiences: srv.assertionAudiences
        }
      },
      attributes : {
        attributes: []
      }
    };
    if (this.data.service.contacts) {
      for (const c of this.data.service.contacts) {
        frm.contacts.push(this.createContactMap(c));
      }
    }
    const policy = this.data.service.attributeReleasePolicy as LdapSamlRegisteredServiceAttributeReleasePolicy;
    if (policy.allowedAttributes) {
      for (let a of Array.from(Object.keys(policy.allowedAttributes))) {
        frm.attributes.attributes.push({
          key: {key: a, value: ''},
          value: policy.allowedAttributes[a].toString()
        });
      }
    }
    return frm;
  }

  mapForm(service: SamlRegisteredService) {
    const frm = this.value;
    service.serviceId = frm.basics.serviceId;
    service.name = frm.basics.name;
    service.description = frm.basics.description;
    service.contacts = [];
    for (const c of frm.contacts) {
      const drsc = new DefaultRegisteredServiceContact();
      drsc.name = c.name;
      drsc.email = c.email;
      drsc.phone = c.phone;
      drsc.department = c.department;
      service.contacts.push(drsc);
    }
    if (!service.multifactorPolicy && frm.advanced.requiresDuo) {
      service.multifactorPolicy = new DefaultRegisteredServiceMultifactorPolicy();
    }
    if (frm.advanced.requiresDuo) {
      (<DefaultRegisteredServiceMultifactorPolicy>service.multifactorPolicy).multifactorAuthenticationProviders = [];
      (<DefaultRegisteredServiceMultifactorPolicy>service.multifactorPolicy).multifactorAuthenticationProviders.push('mfa-duo');
    } else {
      service.multifactorPolicy = null;
    }
    service.accessStrategy.ssoEnabled = frm.advanced.ssoEnabled;
    service.logoutType = frm.advanced.logoutType;
    service.logoutUrl = frm.advanced.logoutUrl;
    service.metadataLocation = frm.saml.metadata.location;
    service.requiredNameIdFormat = frm.saml.nameId.requiredNameIdFormat;
    service.skipGeneratingAssertionNameId = frm.saml.optionalSaml.skipGeneratingAssertionNameId;
    service.skipGeneratingSubjectConfirmationInResponseTo = frm.saml.optionalSaml.skipGeneratingSubjectConfirmationInResponseTo;
    service.skipGeneratingSubjectConfirmationNotOnOrAfter = frm.saml.optionalSaml.skipGeneratingSubjectConfirmationNotOnOrAfter;
    service.skipGeneratingSubjectConfirmationRecipient = frm.saml.optionalSaml.skipGeneratingSubjectConfirmationRecipient;
    service.skipGeneratingSubjectConfirmationNotBefore = frm.saml.optionalSaml.skipGeneratingSubjectConfirmationNotBefore;
    service.signAssertions = frm.saml.security.signAssertions;
    service.signResponses = frm.saml.security.signResponses;
    service.encryptAssertions = frm.saml.security.encryptAssertions;
    service.signingCredentialType = frm.saml.security.signingCredentialType;
    service.requiredAuthenticationContextClass = frm.saml.security.requiredAuthenticationContextClass;
    service.assertionAudiences = frm.saml.security.assertionAudiences;
    const attr = this.get('attributes').get('attributes') as FormArray;
    if (attr.length > 0) {
      const map = new Map<string, string[]>();
      for (let c of attr.value) {
        map[c.key.key] = c.value.split(",")
      }
      (<LdapSamlRegisteredServiceAttributeReleasePolicy>service.attributeReleasePolicy).allowedAttributes = map;
    }
  }

  requiresDuo(policy: RegisteredServiceMultifactorPolicy): boolean {
    if (DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy) &&
      (<DefaultRegisteredServiceMultifactorPolicy>policy).multifactorAuthenticationProviders) {
      return (<DefaultRegisteredServiceMultifactorPolicy>policy).multifactorAuthenticationProviders.indexOf('mfa-duo') > -1;
    }
    return false;
  }

  createContactMap(contact: DefaultRegisteredServiceContact): any {
    return {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      department: contact.department
    };
  }
}

export const logoutUrlRequired: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const type = control.get('logoutType');
  const url = control.get('logoutUrl');
  if (type.value === 'FRONT_CHANNEL' && url.value === null) {
    url.setErrors({'logoutUrlRequired': {value: url.value}});
  }
  return null;
};

