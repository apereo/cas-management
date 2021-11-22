import { RegisteredServiceDelegatedAuthenticationPolicy, delegatedAuthenticationPolicyFactory } from './delegated-authn.model';
import {attributeRepoFactory, PrincipalAttributesRepository} from './attribute-repo.model';

/**
 * Base data class for RegisteredServiceAccessStrategy.
 */
export abstract class RegisteredServiceAccessStrategy {
  order: number;
  enabled: boolean;
  ssoEnabled: boolean;
  unauthorizedRedirectUrl: string;
  delegatedAuthenticationPolicy: RegisteredServiceDelegatedAuthenticationPolicy;
  requireAllAttributes: boolean;
  requiredAttributes: Map<string, string[]>;
  rejectedAttributes: Map<string, string[]>;
  caseInsensitive: boolean;

  constructor(strat?: RegisteredServiceAccessStrategy) {
    this.enabled = strat?.enabled ?? true;
    this.ssoEnabled = strat?.ssoEnabled ?? true;
    this.unauthorizedRedirectUrl = strat?.unauthorizedRedirectUrl;
    this.delegatedAuthenticationPolicy = delegatedAuthenticationPolicyFactory(strat?.delegatedAuthenticationPolicy);
    this.requiredAttributes = strat?.requiredAttributes;
    this.requireAllAttributes = strat?.requireAllAttributes ?? true;
    this.rejectedAttributes = strat?.rejectedAttributes;
    this.caseInsensitive = strat?.caseInsensitive ?? false;
  }
}

/**
 * Data class for DefaultRegisteredServiceAccessStrategy.
 */
export class DefaultRegisteredServiceAccessStrategy extends RegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceAccessStrategy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceAccessStrategy.
   *
   * @param obj - object to inspect
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    this['@class'] = DefaultRegisteredServiceAccessStrategy.cName;
  }
}

/**
 * Data class for RemoteEndpointServiceAccessStrategy.
 */
export class RemoteEndpointServiceAccessStrategy extends DefaultRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.RemoteEndpointServiceAccessStrategy';

  endpointUrl: string;
  acceptableResponseCodes: string;

  /**
   * Returns true if the passed object is an instance of RemoteEndpointServiceAccessStrategy.
   *
   * @param obj - object to inspect
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RemoteEndpointServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: RemoteEndpointServiceAccessStrategy = RemoteEndpointServiceAccessStrategy.instanceOf(strat)
      ? strat as RemoteEndpointServiceAccessStrategy : undefined;
    this.endpointUrl = s?.endpointUrl;
    this.acceptableResponseCodes = s?.acceptableResponseCodes;
    this['@class'] = RemoteEndpointServiceAccessStrategy.cName;
  }
}

/**
 * Data class for TimeBasedRegisteredServiceAccessStrategy.
 */
export class TimeBasedRegisteredServiceAccessStrategy extends DefaultRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.TimeBasedRegisteredServiceAccessStrategy';

  startingDate: string;
  endingDate: string;
  startingTime: string;
  endingTime: string;

  /**
   * Returns true if passed object is an instance of TimeBasedRegisteredServiceAccessStrategy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === TimeBasedRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: TimeBasedRegisteredServiceAccessStrategy = TimeBasedRegisteredServiceAccessStrategy.instanceOf(strat)
      ? strat as TimeBasedRegisteredServiceAccessStrategy : undefined;
    this.startingDate = s?.startingDate;
    this.endingDate = s?.endingDate;
    this.startingTime = s?.startingTime;
    this.endingTime = s?.endingTime;
    this['@class'] = TimeBasedRegisteredServiceAccessStrategy.cName;
  }
}

/**
 * Data class for representing GrouperRegisteredServiceAccessStrategy.
 */
export class GrouperRegisteredServiceAccessStrategy extends TimeBasedRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.grouper.services.GrouperRegisteredServiceAccessStrategy';

  groupField: string;

  /**
   * Returns true if the passed object is an instance of GrouperRegisteredServiceAccessStrategy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GrouperRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: GrouperRegisteredServiceAccessStrategy = GrouperRegisteredServiceAccessStrategy.instanceOf(strat)
      ? strat as GrouperRegisteredServiceAccessStrategy : undefined;
    this.groupField = s?.groupField;
    this['@class'] = GrouperRegisteredServiceAccessStrategy.cName;
  }
}

/**
 * Data class for BaseSurrogateRegisteredServiceAccessStrategy.
 */
export class BaseSurrogateRegisteredServiceAccessStrategy extends DefaultRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.BaseSurrogateRegisteredServiceAccessStrategy';

  /**
   * Returns true if the passed object is an instance of BaseSurrogateRegisteredServiceAccessStrategy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === BaseSurrogateRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    this['@class'] = BaseSurrogateRegisteredServiceAccessStrategy.cName;
  }
}

/**
 * Data class for SurrogateRegisteredServiceAccessStrategy.
 */
export class SurrogateRegisteredServiceAccessStrategy extends BaseSurrogateRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.SurrogateRegisteredServiceAccessStrategy';

  surrogateEnabled: boolean;
  surrogateRequiredAttributes: Map<string, string[]>;

  /**
   * Returns true if the passed object is an instance of SurrogateRegisteredServiceAccessStrategy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === SurrogateRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: SurrogateRegisteredServiceAccessStrategy = SurrogateRegisteredServiceAccessStrategy.instanceOf(strat)
      ? strat as SurrogateRegisteredServiceAccessStrategy : undefined;
    this.surrogateEnabled = s?.surrogateEnabled;
    this.surrogateRequiredAttributes = s?.surrogateRequiredAttributes;
    this['@class'] = SurrogateRegisteredServiceAccessStrategy.cName;
  }
}

/**
 * Data class for GroovySurrogateRegisteredServiceAccessStrategy.
 */
export class GroovySurrogateRegisteredServiceAccessStrategy extends RegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.GroovySurrogateRegisteredServiceAccessStrategy';

  groovyScript: string;

  /**
   * Returns true if the passed object is an instance of GroovySurrogateRegisteredServiceAccessStrategy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovySurrogateRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: GroovySurrogateRegisteredServiceAccessStrategy = GroovySurrogateRegisteredServiceAccessStrategy.instanceOf(strat)
      ? strat as GroovySurrogateRegisteredServiceAccessStrategy : undefined;
    this.groovyScript = s?.groovyScript;
    this['@class'] = GroovySurrogateRegisteredServiceAccessStrategy.cName;
  }
}

/**
 * Data class for GroovyRegisteredServiceAccessStrategy.
 */
export class GroovyRegisteredServiceAccessStrategy extends RegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.GroovyRegisteredServiceAccessStrategy';

  order: number;
  groovyScript: string;

  /**
   * Returns true if the passed object is an instance of GroovyRegisteredServiceAccessStrategy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovyRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: GroovyRegisteredServiceAccessStrategy = GroovyRegisteredServiceAccessStrategy.instanceOf(strat)
      ? strat as GroovyRegisteredServiceAccessStrategy : undefined;
    this.order = s?.order;
    this.groovyScript = s?.groovyScript;
    this['@class'] = GroovyRegisteredServiceAccessStrategy.cName;
  }
}

export enum AccessStrategyType {
  DEFAULT,
  REMOTE,
  TIME,
  GROUPER,
  GROOVY,
  SURROGATE,
  GROOVY_SURROGATE
}

/**
 * Global factory method to create a RegisteredServiceAccessStrategy form the passed javascript object.
 *
 * @param strat - Access strategy as a javascript object
 */
export function accessStrategyFactory(strat?: any): RegisteredServiceAccessStrategy {
  if (!strat || DefaultRegisteredServiceAccessStrategy.instanceOf(strat)) {
    return new DefaultRegisteredServiceAccessStrategy(strat);
  }
  if (RemoteEndpointServiceAccessStrategy.instanceOf(strat)) {
    return new RemoteEndpointServiceAccessStrategy(strat);
  }
  if (TimeBasedRegisteredServiceAccessStrategy.instanceOf(strat)) {
    return new TimeBasedRegisteredServiceAccessStrategy(strat);
  }
  if (GrouperRegisteredServiceAccessStrategy.instanceOf(strat)) {
    return new GrouperRegisteredServiceAccessStrategy(strat);
  }
  if (GroovyRegisteredServiceAccessStrategy.instanceOf(strat)) {
    return new GroovyRegisteredServiceAccessStrategy(strat);
  }
  if (SurrogateRegisteredServiceAccessStrategy.instanceOf(strat)) {
    return new SurrogateRegisteredServiceAccessStrategy(strat);
  }
  if (GroovySurrogateRegisteredServiceAccessStrategy.instanceOf(strat)) {
    return new GroovySurrogateRegisteredServiceAccessStrategy(strat);
  }
  return strat;
}

