import {FormArray, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  DefaultRegisteredServiceMultifactorPolicy,
  RegisteredServiceMultifactorPolicy,
  DefaultRegisteredServiceContact,
  OidcRegisteredService
} from 'mgmt-lib';

export const logoutUrlRequired: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const type = control.get('logoutType');
  const url = control.get('logoutUrl');
  if (type.value === 'FRONT_CHANNEL' && url.value === null) {
    url.setErrors({'logoutUrlRequired': {value: url.value}});
  }
  return null;
};

export class OidcForm extends FormGroup implements MgmtFormGroup<OidcRegisteredService> {

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
      oidc: new FormGroup({
        clientId: new MgmtFormControl(null, null, Validators.required),
        clientSecret: new MgmtFormControl(null, null, Validators.required),
        bypassApprovalPrompt: new MgmtFormControl(null),
        generateRefreshToken: new MgmtFormControl(null),
        jwks: new MgmtFormControl('file:/ucd/opt/cas/config/oidc-keystore.jwks', null, Validators.required),
        signIdToken: new MgmtFormControl(null),
        implicit: new MgmtFormControl(null),
        encryptIdToken: new MgmtFormControl(null),
        idTokenEncryptionAlg: new MgmtFormControl('RSA-OAEP-256', null, Validators.required),
        idTokenEncryptionEncoding: new MgmtFormControl('A256GCM', null, Validators.required),
        subjectType: new MgmtFormControl('PUBLIC'),
        sectorIdentifierUri: new MgmtFormControl(null),
        dynamicRegistrationDateTime: new MgmtFormControl(null),
        responseTypes: new MgmtFormControl(null),
        grantTypes: new MgmtFormControl(null)
      }),
      scopes: new MgmtFormControl(null)
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
    this.setValue(this.formMap());
  }

  formMap(): any {
    const srv: OidcRegisteredService = this.data.service as OidcRegisteredService;
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
      oidc: {
        clientId: srv.clientId,
        clientSecret: srv.clientSecret,
        bypassApprovalPrompt: srv.bypassApprovalPrompt,
        generateRefreshToken: srv.generateRefreshToken,
        jwks: 'file:/ucd/opt/cas/config/oidc-keystore.jwks',
        signIdToken: srv.signIdToken,
        implicit: srv.implicit,
        encryptIdToken: srv.encryptIdToken,
        idTokenEncryptionAlg: 'RSA-OAEP-256',
        idTokenEncryptionEncoding: 'A256GCM',
        subjectType: 'PUBLIC',
        sectorIdentifierUri: srv.sectorIdentifierUri,
        dynamicRegistrationDateTime: srv.dynamicRegistrationDateTime,
        responseTypes: srv.supportedResponseTypes,
        grantTypes: srv.supportedGrantTypes
      },
      scopes: srv.scopes
    };
    if (this.data.service.contacts) {
      for (const c of this.data.service.contacts) {
        frm.contacts.push(this.createContactMap(c));
      }
    }
    return frm;
  }

  mapForm(service: OidcRegisteredService) {
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
    service.clientId =  frm.oidc.clientId;
    service.clientSecret = frm.oidc.clientSecret;
    service.bypassApprovalPrompt = frm.oidc.bypassApprovalPrompt;
    service.generateRefreshToken = frm.oidc.generateRefreshToken;
    service.jwks = frm.oidc.jwks;
    service.signIdToken = frm.oidc.signIdToken;
    service.implicit = frm.oidc.implicit;
    service.encryptIdToken = frm.oidc.encryptIdToken;
    service.idTokenEncryptionAlg = frm.oidc.idTokenEncryptionAlg;
    service.idTokenEncryptionEncoding = frm.oidc.idTokenEncryptionEncoding;
    service.subjectType = frm.oidc.subjectType;
    service.sectorIdentifierUri = frm.oidc.sectorIdentifierUri;
    service.dynamicRegistrationDateTime = frm.oidc.dynamicRegistrationDateTime;
    service.supportedResponseTypes = frm.oidc.responseTypes;
    service.supportedGrantTypes = frm.oidc.grantTypes;
    service.scopes = frm.scopes;

  }

  requiresDuo(policy: RegisteredServiceMultifactorPolicy): boolean {
    if (DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy) &&
      (<DefaultRegisteredServiceMultifactorPolicy>policy).multifactorAuthenticationProviders) {
      return (<DefaultRegisteredServiceMultifactorPolicy>policy).multifactorAuthenticationProviders.indexOf('mfa-duo') > -1;
    }
    return false;
  }


  createContactControl(contact: DefaultRegisteredServiceContact): FormGroup {
    return new FormGroup({
      name: new MgmtFormControl(contact.name, null, Validators.required),
      email: new MgmtFormControl(contact.email, null, Validators.required),
      phone: new MgmtFormControl(contact.phone),
      department: new MgmtFormControl(contact.department)
    });
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
