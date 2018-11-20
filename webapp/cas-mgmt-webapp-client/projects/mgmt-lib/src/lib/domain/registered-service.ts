
import {DefaultRegisteredServiceAccessStrategy, RegisteredServiceAccessStrategy} from './access-strategy';
import {DefaultRegisteredServiceMultifactorPolicy, RegisteredServiceMultifactorPolicy} from './multifactor';
import {RefuseRegisteredServiceProxyPolicy, RegisteredServiceProxyPolicy} from './proxy-policy';
import {
  DefaultRegisteredServiceUsernameProvider,
  RegisteredServiceUsernameAttributeProvider
} from './attribute-provider';
import {
  DenyAllAttributeReleasePolicy,
  RegisteredServiceAttributeReleasePolicy,
  ReturnAllowedAttributeReleasePolicy
} from './attribute-release';
import {RegisteredServicePublicKey} from './public-key';
import {DefaultRegisteredServiceProperty} from './property';
import {RegisteredServiceContact} from './contact';
import {DefaultRegisteredServiceExpirationPolicy, RegisteredServiceExpirationPolicy} from './expiration';
import {Form, FormGroup, Validators} from '@angular/forms';
import {MgmtFormControl} from '../form/mgmt-formcontrol';

export abstract class RegisteredService {
  serviceId: String;
  name: String;
  theme: String;
  informationUrl: String;
  privacyUrl: String;
  responseType: String;
  id: number;
  description: String;
  proxyPolicy: RegisteredServiceProxyPolicy;
  evaluationOrder: number;
  usernameAttributeProvider: RegisteredServiceUsernameAttributeProvider;
  requiredHandlers: String[] = [];
  attributeReleasePolicy: RegisteredServiceAttributeReleasePolicy;
  multifactorPolicy: RegisteredServiceMultifactorPolicy;
  logo: String;
  logoutUrl: String;
  logoutType: String;
  accessStrategy: RegisteredServiceAccessStrategy;
  publicKey: RegisteredServicePublicKey;
  properties: Map<String, DefaultRegisteredServiceProperty>;
  contacts: RegisteredServiceContact[];
  expirationPolicy: RegisteredServiceExpirationPolicy;

  constructor(service?: RegisteredService) {
    this.serviceId = service && service.serviceId;
    this.name = service && service.name;
    this.theme = service && service.theme;
    this.informationUrl = service && service.informationUrl;
    this.privacyUrl = service && service.privacyUrl;
    this.responseType = service && service.responseType;
    this.id = (service && service.id) || -1;
    this.description = service && service.description;
    this.proxyPolicy = (service && service.proxyPolicy) || new RefuseRegisteredServiceProxyPolicy();
    this.evaluationOrder = (service && service.evaluationOrder) || -1;
    this.usernameAttributeProvider = (service && service.usernameAttributeProvider) || new DefaultRegisteredServiceUsernameProvider();
    this.requiredHandlers = service && service.requiredHandlers;
    this.attributeReleasePolicy = (service && service.attributeReleasePolicy) || new DenyAllAttributeReleasePolicy();
    this.multifactorPolicy = (service && service.multifactorPolicy) || new DefaultRegisteredServiceMultifactorPolicy();
    this.logo = service && service.logo;
    this.logoutUrl = service && service.logoutUrl;
    this.logoutType = (service && service.logoutType) || 'BACK_CHANNEL';
    this.accessStrategy = (service && service.accessStrategy) || new DefaultRegisteredServiceAccessStrategy();
    this.publicKey = service && service.publicKey;
    this.properties = service && service.properties;
    this.contacts = service && service.contacts;
    this.expirationPolicy = (service && service.expirationPolicy) || new DefaultRegisteredServiceExpirationPolicy();
  }
}

export abstract class AbstractRegisteredService extends RegisteredService {
  constructor(service?: RegisteredService) {
    super(service);
  }
}

export class RegexRegisteredService extends AbstractRegisteredService {
  static cName = 'org.apereo.cas.services.RegexRegisteredService';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegexRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    this['@class'] = RegexRegisteredService.cName;
  }
}

export class ServiceForm extends FormGroup {

  constructor(service: AbstractRegisteredService) {
    super({
      serviceId: new MgmtFormControl(service.serviceId, '', Validators.required),
      name: new MgmtFormControl(service.name, '', Validators.required),
      theme: new MgmtFormControl(service.theme),
      informationUrl: new MgmtFormControl(service.informationUrl),
      privacyUrl: new MgmtFormControl(service.privacyUrl),
      responseType: new MgmtFormControl(service.responseType),
      id: new MgmtFormControl(service.id),
      description: new MgmtFormControl(service.description),
      proxyPolicy: new FormGroup({}),
      evaluationOrder: new MgmtFormControl(service.evaluationOrder),
      usernameAttributeProvider: new FormGroup({}),// RegisteredServiceUsernameAttributeProvider;
      requiredHandlers: new MgmtFormControl(service.requiredHandlers),
      attributeReleasePolicy: new FormGroup({}),// RegisteredServiceAttributeReleasePolicy;
      multifactorPolicy: new FormGroup({}),//RegisteredServiceMultifactorPolicy;
      logo: new MgmtFormControl(service.logoutUrl),
      logoutUrl: new MgmtFormControl(service.logoutUrl),
      logoutType: new MgmtFormControl(service.logoutType),
      accessStrategy: new FormGroup({}),//RegisteredServiceAccessStrategy;
      publicKey: new FormGroup({}),//RegisteredServicePublicKey;
      properties: new MgmtFormControl(service.properties),//Map<String, DefaultRegisteredServiceProperty>;
      contacts: new FormGroup({}), //RegisteredServiceContact[];
      expirationPolicy: new FormGroup({})//RegisteredServiceExpirationPolicy;
    });
  }
}
