/**
 * Data class for RegisteredServicePublicKey.
 */
export abstract class RegisteredServicePublicKey {
  location: string;
  algorithm: string;
  publicKeyFactoryBeanClass: any;

  constructor(key?: RegisteredServicePublicKey) {
    this.location = key?.location;
    this.algorithm = key?.algorithm ?? 'RSA';
    this.publicKeyFactoryBeanClass = key?.publicKeyFactoryBeanClass;
  }
}

/**
 * Data class for RegisteredServicePublicKeyImpl.
 */
export class RegisteredServicePublicKeyImpl extends RegisteredServicePublicKey {
  static cName = 'org.apereo.cas.services.RegisteredServicePublicKeyImpl';

  /**
   * Returns true if the passed object is an instance of RegisteredServicePublicKeyImpl.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServicePublicKeyImpl.cName;
  }

  constructor(key?: RegisteredServicePublicKey) {
    super(key);
    this['@class'] = RegisteredServicePublicKeyImpl.cName;
  }
}
