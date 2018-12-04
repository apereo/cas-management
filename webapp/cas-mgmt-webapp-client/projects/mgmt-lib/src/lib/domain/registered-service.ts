
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
    this.serviceId = (service && service.serviceId) || null;
    this.name = (service && service.name) || null;
    this.theme = (service && service.theme) || null;
    this.informationUrl = (service && service.informationUrl) || null;
    this.privacyUrl = (service && service.privacyUrl) || null;
    this.responseType = (service && service.responseType) || null;
    this.id = (service && service.id) || -1;
    this.description = (service && service.description) || null;
    this.proxyPolicy = (service && service.proxyPolicy) || new RefuseRegisteredServiceProxyPolicy();
    this.evaluationOrder = (service && service.evaluationOrder) || -1;
    this.usernameAttributeProvider = (service && service.usernameAttributeProvider) || new DefaultRegisteredServiceUsernameProvider();
    this.requiredHandlers = (service && service.requiredHandlers) || null;
    this.attributeReleasePolicy = (service && service.attributeReleasePolicy) || new DenyAllAttributeReleasePolicy();
    this.multifactorPolicy = (service && service.multifactorPolicy) || new DefaultRegisteredServiceMultifactorPolicy();
    this.logo = (service && service.logo) || null;
    this.logoutUrl = (service && service.logoutUrl) || null;
    this.logoutType = (service && service.logoutType) || 'BACK_CHANNEL';
    this.accessStrategy = (service && service.accessStrategy) || new DefaultRegisteredServiceAccessStrategy();
    this.publicKey = (service && service.publicKey) || null;
    this.properties = (service && service.properties) || null;
    this.contacts = (service && service.contacts) || null;
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

