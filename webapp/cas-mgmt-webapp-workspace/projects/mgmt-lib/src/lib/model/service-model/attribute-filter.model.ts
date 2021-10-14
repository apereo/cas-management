/**
 * Abstract class for RegisteredServiceAttributeFilter.
 */
export abstract class RegisteredServiceAttributeFilter {
  order: number;

  protected constructor() {
  }
}

/**
 * Data class for RegisteredServiceChainingAttributeFilter.
 */
export class RegisteredServiceChainingAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceChainingAttributeFilter';

  filters: RegisteredServiceAttributeFilter[];

  /**
   * Returns true if the passed object is an instance of RegisteredServiceChainingAttributeFilter.
   *
   * @param obj - object to be inspected
   */
  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceChainingAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceChainingAttributeFilter = RegisteredServiceChainingAttributeFilter.instanceof(filter)
      ? filter as RegisteredServiceChainingAttributeFilter : undefined;
    this.filters = f?.filters || [];
    this['@class'] = RegisteredServiceChainingAttributeFilter.cName;
    this.order = 0;
  }
}

/**
 * Data class for RegisteredServiceRegexAttributeFilter.
 */
export class RegisteredServiceRegexAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceRegexAttributeFilter';

  pattern: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceRegexAttributeFilter.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceRegexAttributeFilter = RegisteredServiceRegexAttributeFilter.instanceOf(filter)
      ? filter as RegisteredServiceRegexAttributeFilter : undefined;
    this.order = f?.order;
    this.pattern = f?.pattern;
    this['@class'] = RegisteredServiceRegexAttributeFilter.cName;
  }
}

/**
 * Data class for RegisteredServiceMappedRegexAttributeFilter.
 */
export class RegisteredServiceMappedRegexAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceMappedRegexAttributeFilter';

  patterns: Map<string, string>;
  excludeUnmappedAttributes: boolean;
  caseInsensitive: boolean;
  completeMatch: boolean;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceMappedRegexAttributeFilter.
   *
   * @param obj - object to be inspected
   */
  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceMappedRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceMappedRegexAttributeFilter = RegisteredServiceMappedRegexAttributeFilter.instanceof(filter)
      ? filter as RegisteredServiceMappedRegexAttributeFilter : undefined;
    this.patterns = f?.patterns;
    this.excludeUnmappedAttributes = f?.excludeUnmappedAttributes ?? false;
    this.caseInsensitive = f?.caseInsensitive ?? true;
    this.completeMatch = f?.completeMatch ?? false;
    this.order = f?.order;
    this['@class'] = RegisteredServiceMappedRegexAttributeFilter.cName;
  }
}

/**
 * Data class for RegisteredServiceReverseMappedRegexAttributeFilter.
 */
export class RegisteredServiceReverseMappedRegexAttributeFilter extends RegisteredServiceMappedRegexAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceReverseMappedRegexAttributeFilter';

  /**
   * Returns true if the passed object is an instance of RegisteredServiceReverseMappedRegexAttributeFilter.
   *
   * @param obj - object to be inspected
   */
  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceReverseMappedRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super(filter);
    this['@class'] = RegisteredServiceReverseMappedRegexAttributeFilter.cName;
  }
}

/**
 * Data class for RegisteredServiceMutantRegexAttributeFilter.
 */
export class RegisteredServiceMutantRegexAttributeFilter extends RegisteredServiceMappedRegexAttributeFilter {
    static cName = 'org.apereo.cas.services.support.RegisteredServiceMutantRegexAttributeFilter';

  /**
   * Returns true if the passed object is an instance of RegisteredServiceMutantRegexAttributeFilter.
   *
   * @param obj - object to be inspected
   */
    static instanceof(obj: any): boolean {
        return obj && obj['@class'] === RegisteredServiceMutantRegexAttributeFilter.cName;
    }

    constructor(filter?: RegisteredServiceAttributeFilter) {
        super(filter);
        this['@class'] = RegisteredServiceMutantRegexAttributeFilter.cName;
    }
}

/**
 * Data class for RegisteredServiceScriptedAttributeFilter.
 */
export class RegisteredServiceScriptedAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceScriptedAttributeFilter';

  script: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceScriptedAttributeFilter.
   *
   * @param obj - object to be inspected
   */
  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceScriptedAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceScriptedAttributeFilter = RegisteredServiceScriptedAttributeFilter.instanceof(filter)
      ? filter as RegisteredServiceScriptedAttributeFilter : undefined;
    this.script = f?.script;
    this.order = f?.order;
    this['@class'] = RegisteredServiceScriptedAttributeFilter.cName;
  }
}

export enum FilterType {
  REGEX,
  MAPPED_REGEX,
  REVERSE_MAPPED_REGEX,
  SCRIPTED,
  MUTANT_REGEX,
  CHAINING
}

/**
 * Global factory function to create RegisteredServiceAttributeFilter from js object.
 *
 * @param filter - filter as js object
 * @param type - FilterType
 */
export function attributeFilterFactory(filter?: any, type?: FilterType): RegisteredServiceAttributeFilter {
  if (type === FilterType.REGEX || RegisteredServiceRegexAttributeFilter.instanceOf(filter)) {
    return new RegisteredServiceRegexAttributeFilter(filter);
  }
  if (type === FilterType.MAPPED_REGEX || RegisteredServiceMappedRegexAttributeFilter.instanceof(filter)) {
    return new RegisteredServiceMappedRegexAttributeFilter(filter);
  }
  if (type === FilterType.REVERSE_MAPPED_REGEX || RegisteredServiceReverseMappedRegexAttributeFilter.instanceof(filter)) {
    return new RegisteredServiceReverseMappedRegexAttributeFilter(filter);
  }
  if (type === FilterType.SCRIPTED || RegisteredServiceScriptedAttributeFilter.instanceof(filter)) {
    return new RegisteredServiceScriptedAttributeFilter(filter);
  }
  if (type === FilterType.MUTANT_REGEX || RegisteredServiceMutantRegexAttributeFilter.instanceof(filter)) {
    return new RegisteredServiceMutantRegexAttributeFilter(filter);
  }
  if (type === FilterType.CHAINING || RegisteredServiceChainingAttributeFilter.instanceof(filter)) {
    return new RegisteredServiceChainingAttributeFilter(filter);
  }
  return filter;
}
