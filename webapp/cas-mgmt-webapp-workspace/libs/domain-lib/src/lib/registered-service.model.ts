
import {
  accessStrategyFactory,
  DefaultRegisteredServiceAccessStrategy,
  RegisteredServiceAccessStrategy
} from './access-strategy.model';
import {
  DefaultRegisteredServiceMultifactorPolicy,
  mfaPolicyFactory,
  RegisteredServiceMultifactorPolicy
} from './multifactor.model';
import {proxyFactory, RefuseRegisteredServiceProxyPolicy, RegisteredServiceProxyPolicy} from './proxy-policy.model';
import {
  DefaultRegisteredServiceUsernameProvider,
  RegisteredServiceUsernameAttributeProvider, usernameProviderFactory
} from './attribute-provider.model';
import {
  attributeReleaseFactory,
  DenyAllAttributeReleasePolicy,
  RegisteredServiceAttributeReleasePolicy,
  ReturnAllowedAttributeReleasePolicy
} from './attribute-release.model';
import {RegisteredServicePublicKey} from './public-key.model';
import {DefaultRegisteredServiceProperty} from './property.model';
import {contactsFactory, RegisteredServiceContact} from './contact.model';
import {
  DefaultRegisteredServiceExpirationPolicy,
  expirationPolicyFactory,
  RegisteredServiceExpirationPolicy
} from './expiration.model';
import {
  RegisteredServiceServiceTicketExpirationPolicy,
  serviceTicketExpirationPolicy
} from './service-ticket-expiration.model';
import {proxyTicketExpirationPolicy, RegisteredServiceProxyTicketExpirationPolicy} from './proxy-ticket-expiration.model';
import {RegisteredServiceSingleSignOnParticipationPolicy, ssoParticipationPolicy} from './sso-expiration.model';

export abstract class RegisteredService {
  serviceId: string;
  name: string;
  theme: string;
  informationUrl: string;
  privacyUrl: string;
  responseType: string;
  id: number;
  description: string;
  proxyPolicy: RegisteredServiceProxyPolicy;
  proxyTicketExpirationPolicy: RegisteredServiceProxyTicketExpirationPolicy;
  serviceTicketExpirationPolicy: RegisteredServiceServiceTicketExpirationPolicy;
  singleSignOnParticipationPolicy: RegisteredServiceSingleSignOnParticipationPolicy;
  evaluationOrder: number;
  usernameAttributeProvider: RegisteredServiceUsernameAttributeProvider;
  requiredHandlers: string[];
  attributeReleasePolicy: RegisteredServiceAttributeReleasePolicy;
  multifactorPolicy: RegisteredServiceMultifactorPolicy;
  logo: string;
  logoutUrl: string;
  logoutType: string;
  accessStrategy: RegisteredServiceAccessStrategy;
  publicKey: RegisteredServicePublicKey;
  properties: Map<string, DefaultRegisteredServiceProperty>;
  contacts: RegisteredServiceContact[];
  expirationPolicy: RegisteredServiceExpirationPolicy;
  environments: string[];

  constructor(service?: RegisteredService) {
    this.serviceId = (service && service.serviceId) || null;
    this.name = (service && service.name) || null;
    this.theme = (service && service.theme) || null;
    this.informationUrl = (service && service.informationUrl) || null;
    this.privacyUrl = (service && service.privacyUrl) || null;
    this.responseType = (service && service.responseType) || null;
    this.id = (service && service.id) || -1;
    this.description = (service && service.description) || null;
    this.proxyPolicy = proxyFactory(service && service.proxyPolicy);
    this.proxyTicketExpirationPolicy = proxyTicketExpirationPolicy(service && service.proxyTicketExpirationPolicy);
    this.serviceTicketExpirationPolicy = serviceTicketExpirationPolicy(service && service.serviceTicketExpirationPolicy);
    this.singleSignOnParticipationPolicy = ssoParticipationPolicy(service && service.singleSignOnParticipationPolicy);
    this.evaluationOrder = (service && service.evaluationOrder) || -1;
    this.usernameAttributeProvider = usernameProviderFactory(service && service.usernameAttributeProvider);
    this.requiredHandlers = (service && service.requiredHandlers) || null;
    this.attributeReleasePolicy = attributeReleaseFactory(service && service.attributeReleasePolicy);
    this.multifactorPolicy = mfaPolicyFactory(service && service.multifactorPolicy);
    this.logo = (service && service.logo) || null;
    this.logoutUrl = (service && service.logoutUrl) || null;
    this.logoutType = (service && service.logoutType) || 'BACK_CHANNEL';
    this.accessStrategy = accessStrategyFactory(service && service.accessStrategy);
    this.publicKey = (service && service.publicKey) || null;
    this.properties = (service && service.properties) || null;
    this.contacts = contactsFactory(service && service.contacts);
    this.expirationPolicy = expirationPolicyFactory(service && service.expirationPolicy);
    this.environments = (service && service.environments) || null;
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

