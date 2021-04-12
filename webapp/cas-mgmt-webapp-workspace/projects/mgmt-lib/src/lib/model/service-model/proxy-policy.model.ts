/**
 * Data class for RegisteredServiceProxyPolicy.
 */
export abstract class RegisteredServiceProxyPolicy {

}

export enum ProxyType {
  REFUSE,
  REGEX
}

/**
 * Data class for RegexMatchingRegisteredServiceProxyPolicy.
 */
export class RegexMatchingRegisteredServiceProxyPolicy extends RegisteredServiceProxyPolicy {
  static cName =  'org.apereo.cas.services.RegexMatchingRegisteredServiceProxyPolicy';

  pattern: string;

  /**
   * Returns true if the passed object is an instance of RegexMatchingRegisteredServiceProxyPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegexMatchingRegisteredServiceProxyPolicy.cName;
  }

  constructor(policy?: RegisteredServiceProxyPolicy) {
    super();
    const p: RegexMatchingRegisteredServiceProxyPolicy = RegexMatchingRegisteredServiceProxyPolicy.instanceOf(policy)
      ? policy as RegexMatchingRegisteredServiceProxyPolicy : undefined;
    this.pattern = p?.pattern;
    this['@class'] = RegexMatchingRegisteredServiceProxyPolicy.cName;
  }
}

/**
 * Data class for RefuseRegisteredServiceProxyPolicy.
 */
export class RefuseRegisteredServiceProxyPolicy extends RegisteredServiceProxyPolicy {
  static cName = 'org.apereo.cas.services.RefuseRegisteredServiceProxyPolicy';

  /**
   * Returns true if the passed object is an instance of RefuseRegisteredServiceProxyPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RefuseRegisteredServiceProxyPolicy.cName;
  }

  constructor() {
    super();
    this['@class'] = RefuseRegisteredServiceProxyPolicy.cName;
  }
}

/**
 * Global factory function to create RegisteredServiceProxyPolicy from js object.
 *
 * @param policy - policy as js object
 */
export function proxyFactory(policy: any): RegisteredServiceProxyPolicy {
  if (RegexMatchingRegisteredServiceProxyPolicy.instanceOf(policy)) {
    return new RegexMatchingRegisteredServiceProxyPolicy(policy);
  }
  if (!policy || RefuseRegisteredServiceProxyPolicy.instanceOf(policy)) {
    return new RefuseRegisteredServiceProxyPolicy();
  }
  return policy;
}


