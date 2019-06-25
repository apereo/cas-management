import {FormArray, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  DefaultRegisteredServiceMultifactorPolicy,
  RegisteredServiceMultifactorPolicy,
  DefaultRegisteredServiceContact,
  AbstractRegisteredService
} from 'mgmt-lib';

export const logoutUrlRequired: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const type = control.get('logoutType');
  const url = control.get('logoutUrl');
  if (type.value === 'FRONT_CHANNEL' && url.value === null) {
    url.setErrors({'logoutUrlRequired': {value: url.value}});
  }
  return null;
};

export class RegisterForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

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
        staged: new MgmtFormControl(null),
        logoutType: new MgmtFormControl(null),
        logoutUrl: new MgmtFormControl(null)
      }, {validators: logoutUrlRequired })
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
    const frm =  {
      basics: {
        serviceId: this.data.service.serviceId || 'https://',
        name: this.data.service.name,
        description: this.data.service.description
      },
      contacts: [],
      advanced: {
        requiresDuo: this.requiresDuo(this.data.service.multifactorPolicy),
        staged: this.isStaged(this.data.service.environments),
        ssoEnabled: this.data.service.accessStrategy.ssoEnabled,
        logoutType: this.data.service.logoutType,
        logoutUrl: this.data.service.logoutUrl
      }
    };
    if (this.data.service.contacts) {
      for (const c of this.data.service.contacts) {
        frm.contacts.push(this.createContactMap(c));
      }
    }
    return frm;
  }

  mapForm(service: AbstractRegisteredService) {
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
    if (frm.advanced.staged) {
      service.environments = [];
      service.environments.push('staged');
    } else {
      service.environments = [];
    }
    service.accessStrategy.ssoEnabled = frm.advanced.ssoEnabled;
    service.logoutType = frm.advanced.logoutType;
    service.logoutUrl = frm.advanced.logoutUrl;
  }

  requiresDuo(policy: RegisteredServiceMultifactorPolicy): boolean {
    if (DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy) &&
      (<DefaultRegisteredServiceMultifactorPolicy>policy).multifactorAuthenticationProviders) {
      return (<DefaultRegisteredServiceMultifactorPolicy>policy).multifactorAuthenticationProviders.indexOf('mfa-duo') > -1;
    }
    return false;
  }

  isStaged(environments: string[]) {
    return environments && environments.indexOf('staged') > -1;
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
