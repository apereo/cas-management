export abstract class PrincipalAttributesRepository {
  mergingStrategy: string;
  attributeRepositoryIds: string[];
  ignoreResolvedAttributes: boolean;

  constructor(repo?: PrincipalAttributesRepository) {
    this.mergingStrategy = (repo && repo.mergingStrategy) || 'MULTIVALUED';
    this.attributeRepositoryIds = (repo && repo.attributeRepositoryIds) || [];
    this.ignoreResolvedAttributes = (repo && repo.ignoreResolvedAttributes) || false;
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

  expiration: number;
  timeUnit: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === CachingPrincipalAttributesRepository.cName;
  }

  constructor(repo?: PrincipalAttributesRepository) {
    super(repo);
    const r: CachingPrincipalAttributesRepository = CachingPrincipalAttributesRepository.instanceOf(repo)
      ? repo as CachingPrincipalAttributesRepository : undefined;
    this.expiration = (r && r.expiration) || null;
    this.timeUnit = (r && r.timeUnit) || null;
    this['@class'] = CachingPrincipalAttributesRepository.cName;
  }
}

export function attributeRepoFactory(repo?: any): PrincipalAttributesRepository {
  if (!repo || DefaultPrincipalAttributesRepository.instanceOf(repo)) {
    return new DefaultPrincipalAttributesRepository(repo);
  }
  if (CachingPrincipalAttributesRepository.instanceOf(repo)) {
    return new CachingPrincipalAttributesRepository(repo);
  }
  return repo;
}
