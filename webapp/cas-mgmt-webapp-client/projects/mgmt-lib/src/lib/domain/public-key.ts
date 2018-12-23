export abstract class RegisteredServicePublicKey {
  location: string;
  algorithm: string;
  publicKeyFactoryBeanClass: any;

  constructor(key?: RegisteredServicePublicKey){
    this.location = (key && key.location) || null;
    this.algorithm = (key && key.algorithm) || 'RSA';
    this.publicKeyFactoryBeanClass = (key && key.publicKeyFactoryBeanClass) || null;
  }
}

export class RegisteredServicePublicKeyImpl extends RegisteredServicePublicKey {
  static cName = 'org.apereo.cas.services.RegisteredServicePublicKeyImpl';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServicePublicKeyImpl.cName;
  }

  constructor(key?: RegisteredServicePublicKey) {
    super(key);
    this['@class'] = RegisteredServicePublicKeyImpl.cName;
  }
}
