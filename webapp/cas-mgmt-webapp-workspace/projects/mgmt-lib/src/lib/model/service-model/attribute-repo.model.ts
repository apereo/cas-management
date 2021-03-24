/**
 * Data class for PrincipalAttributesRepository.
 */
export abstract class PrincipalAttributesRepository {
  mergingStrategy: string;
  attributeRepositoryIds: string[];
  ignoreResolvedAttributes: boolean;

  constructor(repo?: PrincipalAttributesRepository) {
    this.mergingStrategy = repo?.mergingStrategy ?? 'MULTIVALUED';
    this.attributeRepositoryIds = repo?.attributeRepositoryIds ?? [];
    this.ignoreResolvedAttributes = repo?.ignoreResolvedAttributes ?? false;
  }
}

/**
 * Data class for AbstractPrincipalAttributesRepository.
 */
export abstract class AbstractPrincipalAttributesRepository extends PrincipalAttributesRepository {
  static cName = 'org.apereo.cas.authentication.principal.AbstractPrincipalAttributesRepository';

  /**
   * Returns true if the passed object is an instance of AbstractPrincipalAttributesRepository.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === AbstractPrincipalAttributesRepository.cName;
  }

  constructor(repo?: PrincipalAttributesRepository) {
    super(repo);
    this['@class'] = AbstractPrincipalAttributesRepository.cName;
  }

}

/**
 * Data class for DefaultPrincipalAttributesRepository.
 */
export class DefaultPrincipalAttributesRepository extends AbstractPrincipalAttributesRepository {
  static cName = 'org.apereo.cas.authentication.principal.DefaultPrincipalAttributesRepository';

  /**
   * Returns true if the passed object is an instance of DefaultPrincipalAttributesRepository.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultPrincipalAttributesRepository.cName;
  }

  constructor(repo?: PrincipalAttributesRepository) {
    super(repo);
    this['@class'] = DefaultPrincipalAttributesRepository.cName;
  }
}

/**
 * Data class for CachingPrincipalAttributesRepository.
 */
export class CachingPrincipalAttributesRepository extends AbstractPrincipalAttributesRepository {
  static cName = 'org.apereo.cas.authentication.principal.cache.CachingPrincipalAttributesRepository';

  expiration: number;
  timeUnit: string;

  /**
   * Returns true if the passed object is an instance of CachingPrincipalAttributesRepository.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === CachingPrincipalAttributesRepository.cName;
  }

  constructor(repo?: PrincipalAttributesRepository) {
    super(repo);
    const r: CachingPrincipalAttributesRepository = CachingPrincipalAttributesRepository.instanceOf(repo)
      ? repo as CachingPrincipalAttributesRepository : undefined;
    this.expiration = r?.expiration;
    this.timeUnit = r?.timeUnit;
    this['@class'] = CachingPrincipalAttributesRepository.cName;
  }
}

/**
 * Global factory function for PrincipalAttributeRepository from js object.
 *
 * @param repo - Repository as js object
 */
export function attributeRepoFactory(repo?: any): PrincipalAttributesRepository {
  if (!repo || DefaultPrincipalAttributesRepository.instanceOf(repo)) {
    return new DefaultPrincipalAttributesRepository(repo);
  }
  if (CachingPrincipalAttributesRepository.instanceOf(repo)) {
    return new CachingPrincipalAttributesRepository(repo);
  }
  return repo;
}
