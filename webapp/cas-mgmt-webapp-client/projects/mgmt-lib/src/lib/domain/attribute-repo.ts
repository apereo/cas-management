export abstract class PrincipalAttributesRepository {
  expiration: number;
  timeUnit: string;
  mergingStrategy: string;

  constructor(repo?: PrincipalAttributesRepository) {
    this.expiration = (repo && repo.expiration) || 0;
    this.timeUnit = (repo && repo.timeUnit) || null;
    this.mergingStrategy = (repo && repo.mergingStrategy) || null;
  }
}

export abstract class AbstractPrincipalAttributesRepository extends PrincipalAttributesRepository {
  static cName = 'org.apereo.cas.authentication.principal.AbstractPrincipalAttributesRepository';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === AbstractPrincipalAttributesRepository.cName;
  }

  constructor(repo?: PrincipalAttributesRepository) {
    super(repo);
    this['@class'] = AbstractPrincipalAttributesRepository.cName;
  }

}

export class DefaultPrincipalAttributesRepository extends AbstractPrincipalAttributesRepository {
  static cName = 'org.apereo.cas.authentication.principal.DefaultPrincipalAttributesRepository';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultPrincipalAttributesRepository.cName;
  }

  constructor(repo?: PrincipalAttributesRepository) {
    super(repo);
    this['@class'] = DefaultPrincipalAttributesRepository.cName;
  }
}

export class CachingPrincipalAttributesRepository extends AbstractPrincipalAttributesRepository {
  static cName = 'org.apereo.cas.authentication.principal.cache.CachingPrincipalAttributesRepository';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === CachingPrincipalAttributesRepository.cName;
  }

  constructor(repo?: PrincipalAttributesRepository) {
    super(repo);
    this['@class'] = CachingPrincipalAttributesRepository.cName;
  }
}
