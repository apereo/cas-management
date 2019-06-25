import {FormArray, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  DefaultRegisteredServiceMultifactorPolicy,
  RegisteredServiceMultifactorPolicy,
  DefaultRegisteredServiceContact,
  OAuthRegisteredService,
  OAuthAttributeReleasePolicy
} from 'mgmt-lib';
import {AttributeForm} from '@app/form/attribute-form';

export const logoutUrlRequired: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const type = control.get('logoutType');
  const url = control.get('logoutUrl');
  if (type.value === 'FRONT_CHANNEL' && url.value === null) {
    url.setErrors({'logoutUrlRequired': {value: url.value}});
  }
  return null;
};

export class OAuthForm extends FormGroup implements MgmtFormGroup<OAuthRegisteredService> {

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
      oauth: new FormGroup({
        clientId: new MgmtFormControl(null, null, Validators.required),
        clientSecret: new MgmtFormControl(null, null, Validators.required),
        bypassApprovalPrompt: new MgmtFormControl(null),
        generateRefreshToken: new MgmtFormControl(null),
        responseTypes: new MgmtFormControl(null),
        grantTypes: new MgmtFormControl(null)
      }),
      attributes: new AttributeForm((<OAuthAttributeReleasePolicy>data.service.attributeReleasePolicy).allowedAttributes)
    });
    const contacts = this.get('contacts') as FormArray;
    if (this.data.service.contacts) {
      for (let i = 0; i < this.data.service.contacts.length; i++) {
        contacts.push(this.createContactControl(new DefaultRegisteredServiceContact()));
      }
    }
    this.setValue(this.formMap());
  }

  formMap(): any {
    const srv: OAuthRegisteredService = this.data.service as OAuthRegisteredService;
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
      oauth: {
        clientId: srv.clientId,
        clientSecret: srv.clientSecret,
        bypassApprovalPrompt: srv.bypassApprovalPrompt,
        generateRefreshToken: srv.generateRefreshToken,
        responseTypes: srv.supportedResponseTypes,
        grantTypes: srv.supportedGrantTypes
      },
      attributes : (<AttributeForm>this.get('attributes')).formMap()
    };
    if (this.data.service.contacts) {
      for (const c of this.data.service.contacts) {
        frm.contacts.push(this.createContactMap(c));
      }
    }
    return frm;
  }

  mapForm(service: OAuthRegisteredService) {
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
    service.generateRefreshToken = frm.oauth.generateRefreshToken;
    service.bypassApprovalPrompt = frm.oauth.bypassApprovalPrompt;
    service.clientSecret = frm.oauth.clientSecret;
    service.clientId = frm.oauth.clientId;
    service.supportedResponseTypes = frm.oauth.responseTypes;
    service.supportedGrantTypes = frm.oauth.grantTypes;
    (<OAuthAttributeReleasePolicy>service.attributeReleasePolicy).allowedAttributes = (<AttributeForm>this.get('attributes')).mapForm();

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



