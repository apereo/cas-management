import {RegisteredServiceDelegatedAuthenticationPolicy} from './delegated-authn';

export abstract class RegisteredServiceAccessStrategy {
  enabled = true;
  ssoEnabled = false;
  unauthorizedRedirectUrl: String;
  delegatedAuthenticationPolicy: RegisteredServiceDelegatedAuthenticationPolicy;
  requireAllAttributes = false;
  requiredAttributes: Map<String, String[]>;
  rejectedAttributes: Map<String, String[]>;
  caseInsensitive: boolean;

  constructor(strat?: RegisteredServiceAccessStrategy) {
    this.enabled = (strat && strat.enabled) || true;
    this.ssoEnabled = strat && strat.ssoEnabled || true;
    this.unauthorizedRedirectUrl = (strat && strat.unauthorizedRedirectUrl) || null;
    this.delegatedAuthenticationPolicy = strat && strat.delegatedAuthenticationPolicy;
    this.requiredAttributes = (strat && strat.requiredAttributes) || null;
    this.requireAllAttributes = (strat && strat.requireAllAttributes) || true;
    this.rejectedAttributes = (strat && strat.rejectedAttributes) || null;
    this.caseInsensitive = (strat && strat.caseInsensitive) || false;
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

export class DefaultRegisteredServiceAccessStrategy extends RegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceAccessStrategy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    this['@class'] = DefaultRegisteredServiceAccessStrategy.cName;
  }
}

export class RemoteEndpointServiceAccessStrategy extends DefaultRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.RemoteEndpointServiceAccessStrategy';

  endpointUrl: String;
  acceptableResponseCodes: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RemoteEndpointServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: RemoteEndpointServiceAccessStrategy = strat as RemoteEndpointServiceAccessStrategy;
    this.endpointUrl = (s && s.endpointUrl) || null;
    this.acceptableResponseCodes = (s && s.acceptableResponseCodes) || null;
    this['@class'] = RemoteEndpointServiceAccessStrategy.cName;
  }
}

export class TimeBasedRegisteredServiceAccessStrategy extends DefaultRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.TimeBasedRegisteredServiceAccessStrategy';

  startingDateTime: String;
  endingDateTime: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === TimeBasedRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: TimeBasedRegisteredServiceAccessStrategy = strat as TimeBasedRegisteredServiceAccessStrategy;
    this.startingDateTime = (s && s.startingDateTime) || null;
    this.endingDateTime = (s && s.endingDateTime) || null;
    this['@class'] = TimeBasedRegisteredServiceAccessStrategy.cName;
  }
}

export class GrouperRegisteredServiceAccessStrategy extends TimeBasedRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.grouper.services.GrouperRegisteredServiceAccessStrategy';

  groupField: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GrouperRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: GrouperRegisteredServiceAccessStrategy = strat as GrouperRegisteredServiceAccessStrategy;
    this.groupField = (s && s.groupField) || null;
    this['@class'] = GrouperRegisteredServiceAccessStrategy.cName
  }
}

export class BaseSurrogateRegisteredServiceAccessStrategy extends DefaultRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.BaseSurrogateRegisteredServiceAccessStrategy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === BaseSurrogateRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    this['@class'] = BaseSurrogateRegisteredServiceAccessStrategy.cName
  }
}

export class SurrogateRegisteredServiceAccessStrategy extends BaseSurrogateRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.SurrogateRegisteredServiceAccessStrategy';

  surrogateEnabled: boolean;
  surrogateRequiredAttributes: Map<String, String[]>;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === SurrogateRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: SurrogateRegisteredServiceAccessStrategy = strat as SurrogateRegisteredServiceAccessStrategy;
    this.surrogateEnabled = (s && s.surrogateEnabled) || null;
    this.surrogateRequiredAttributes = (s && s.surrogateRequiredAttributes) || null;
    this['@class'] = SurrogateRegisteredServiceAccessStrategy.cName;
  }
}

export class GroovySurrogateRegisteredServiceAccessStrategy extends RegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.GroovySurrogateRegisteredServiceAccessStrategy';

  groovyScript: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovySurrogateRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: GroovySurrogateRegisteredServiceAccessStrategy = strat as GroovySurrogateRegisteredServiceAccessStrategy;
    this.groovyScript = (s && s.groovyScript) || null;
    this['@class'] = GroovySurrogateRegisteredServiceAccessStrategy.cName;
  }
}

export class GroovyRegisteredServiceAccessStrategy extends RegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.GroovyRegisteredServiceAccessStrategy';

  order: number;
  groovyScript: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovyRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: GroovyRegisteredServiceAccessStrategy = strat as GroovyRegisteredServiceAccessStrategy;
    this.order = (s && s.order) || null;
    this.groovyScript = (s && s.groovyScript) || null;
    this['@class'] = GroovyRegisteredServiceAccessStrategy.cName;
  }
}

