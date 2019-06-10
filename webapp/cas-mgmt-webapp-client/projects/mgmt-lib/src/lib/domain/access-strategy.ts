import {RegisteredServiceDelegatedAuthenticationPolicy} from './delegated-authn';

export abstract class RegisteredServiceAccessStrategy {
  enabled: boolean;
  ssoEnabled: boolean;
  unauthorizedRedirectUrl: string;
  delegatedAuthenticationPolicy: RegisteredServiceDelegatedAuthenticationPolicy;
  requireAllAttributes: boolean;
  requiredAttributes: Map<string, string[]>;
  rejectedAttributes: Map<string, string[]>;
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

  endpointUrl: string;
  acceptableResponseCodes: string;

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

  startingDateTime: string;
  endingDateTime: string;

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

  groupField: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GrouperRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    const s: GrouperRegisteredServiceAccessStrategy = strat as GrouperRegisteredServiceAccessStrategy;
    this.groupField = (s && s.groupField) || null;
    this['@class'] = GrouperRegisteredServiceAccessStrategy.cName;
  }
}

export class BaseSurrogateRegisteredServiceAccessStrategy extends DefaultRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.BaseSurrogateRegisteredServiceAccessStrategy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === BaseSurrogateRegisteredServiceAccessStrategy.cName;
  }

  constructor(strat?: RegisteredServiceAccessStrategy) {
    super(strat);
    this['@class'] = BaseSurrogateRegisteredServiceAccessStrategy.cName;
  }
}

export class SurrogateRegisteredServiceAccessStrategy extends BaseSurrogateRegisteredServiceAccessStrategy {
  static cName = 'org.apereo.cas.services.SurrogateRegisteredServiceAccessStrategy';

  surrogateEnabled: boolean;
  surrogateRequiredAttributes: Map<string, string[]>;

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

  groovyScript: string;

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
  groovyScript: string;

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

export enum AccessStrategyType {
  DEFAULT,
  REMOTE,
  TIME,
  GROUPER,
  GROOVY,
  SURROGATE,
  GROOVY_SURROGATE
}

export function accessStrategyFactory(strat?: any): RegisteredServiceAccessStrategy {
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
  if (!strat) {
    return new DefaultRegisteredServiceAccessStrategy(strat);
  }
  return strat;
}

