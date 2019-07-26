export abstract class RegisteredServiceProxyPolicy {

}

export enum ProxyType {
  REFUSE,
  REGEX
}

export class RegexMatchingRegisteredServiceProxyPolicy extends RegisteredServiceProxyPolicy {
  static cName =  'org.apereo.cas.services.RegexMatchingRegisteredServiceProxyPolicy';

  pattern: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegexMatchingRegisteredServiceProxyPolicy.cName;
  }

  constructor(policy?: RegisteredServiceProxyPolicy) {
    super();
    const p: RegexMatchingRegisteredServiceProxyPolicy = RegexMatchingRegisteredServiceProxyPolicy.instanceOf(policy)
      ? policy as RegexMatchingRegisteredServiceProxyPolicy : undefined;
    this.pattern = (p && p.pattern) || null;
    this['@class'] = RegexMatchingRegisteredServiceProxyPolicy.cName;
  }
}

export class RefuseRegisteredServiceProxyPolicy extends RegisteredServiceProxyPolicy {
  static cName = 'org.apereo.cas.services.RefuseRegisteredServiceProxyPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RefuseRegisteredServiceProxyPolicy.cName;
  }

  constructor() {
    super();
    this['@class'] = RefuseRegisteredServiceProxyPolicy.cName;
  }
}

export function proxyFactory(policy: any): RegisteredServiceProxyPolicy {
  if(RegexMatchingRegisteredServiceProxyPolicy.instanceOf(policy)) {
    return new RegexMatchingRegisteredServiceProxyPolicy(policy)
  }
  if (!policy || RefuseRegisteredServiceProxyPolicy.instanceOf(policy)) {
    return new RefuseRegisteredServiceProxyPolicy();
  }
  return policy;
}


