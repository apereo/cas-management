
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
} from './attribute-release';
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

/**
 * Data class for RegisteredService.
 */
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
    this.serviceId = service?.serviceId;
    this.name = service?.name;
    this.theme = service?.theme;
    this.informationUrl = service?.informationUrl;
    this.privacyUrl = service?.privacyUrl;
    this.responseType = service?.responseType;
    this.id = service?.id ?? -1;
    this.description = service?.description;
    this.proxyPolicy = proxyFactory(service?.proxyPolicy);
    this.proxyTicketExpirationPolicy = proxyTicketExpirationPolicy(service?.proxyTicketExpirationPolicy);
    this.serviceTicketExpirationPolicy = serviceTicketExpirationPolicy(service?.serviceTicketExpirationPolicy);
    this.singleSignOnParticipationPolicy = ssoParticipationPolicy(service?.singleSignOnParticipationPolicy);
    this.evaluationOrder = service?.evaluationOrder ?? -1;
    this.usernameAttributeProvider = usernameProviderFactory(service?.usernameAttributeProvider);
    this.requiredHandlers = service?.requiredHandlers;
    this.attributeReleasePolicy = attributeReleaseFactory(service?.attributeReleasePolicy);
    this.multifactorPolicy = mfaPolicyFactory(service?.multifactorPolicy);
    this.logo = service?.logo;
    this.logoutUrl = service?.logoutUrl;
    this.logoutType = service?.logoutType ?? 'BACK_CHANNEL';
    this.accessStrategy = accessStrategyFactory(service?.accessStrategy);
    this.publicKey = service?.publicKey;
    this.properties = service?.properties;
    this.contacts = contactsFactory(service?.contacts);
    this.expirationPolicy = expirationPolicyFactory(service?.expirationPolicy);
    this.environments = service?.environments;
  }
}

/**
 * Data class for AbstractRegisteredService.
 */
export abstract class AbstractRegisteredService extends RegisteredService {
  constructor(service?: RegisteredService) {
    super(service);
  }
}

/**
 * Data class for RegexRegisteredService.
 */
export class RegexRegisteredService extends AbstractRegisteredService {
  static cName = 'org.apereo.cas.services.RegexRegisteredService';

  /**
   * Returns true if the passed object is an instance of RegexRegisteredService.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegexRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    this['@class'] = RegexRegisteredService.cName;
  }
}

