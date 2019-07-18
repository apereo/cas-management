export abstract class RegisteredServiceAttributeFilter {
  constructor() {
  }
}

export class RegisteredServiceChainingAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceChainingAttributeFilter';

  filters: RegisteredServiceAttributeFilter[];

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceChainingAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceChainingAttributeFilter = RegisteredServiceChainingAttributeFilter.instanceof(filter)
      ? filter as RegisteredServiceChainingAttributeFilter : undefined;
    this.filters = (f && f.filters) || null;
    this['@class'] = RegisteredServiceChainingAttributeFilter.cName;
  }
}

export class RegisteredServiceRegexAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceRegexAttributeFilter';

  order: number;
  pattern: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceRegexAttributeFilter = RegisteredServiceRegexAttributeFilter.instanceOf(filter)
      ? filter as RegisteredServiceRegexAttributeFilter : undefined;
    this.order = (f && f.order) || null;
    this.pattern = (f && f.pattern) || null;
    this['@class'] = RegisteredServiceRegexAttributeFilter.cName;
  }
}

export class RegisteredServiceMappedRegexAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceMappedRegexAttributeFilter';

  patterns: Map<string, string>;
  excludeUnmappedAttributes: boolean;
  caseInsensitive: boolean;
  completeMatch: boolean;
  order: number;

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceMappedRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceMappedRegexAttributeFilter = RegisteredServiceMappedRegexAttributeFilter.instanceof(filter)
      ? filter as RegisteredServiceMappedRegexAttributeFilter : undefined;
    this.patterns = (f && f.patterns) || null;
    this.excludeUnmappedAttributes = f ? f.excludeUnmappedAttributes : false;
    this.caseInsensitive = f ? f.caseInsensitive : false;
    this.completeMatch = f ? f.completeMatch : false;
    this.order = (f && f.order) || null;
    this['@class'] = RegisteredServiceMappedRegexAttributeFilter.cName;
  }
}

export class RegisteredServiceReverseMappedRegexAttributeFilter extends RegisteredServiceMappedRegexAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceReverseMappedRegexAttributeFilter';

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceReverseMappedRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super(filter);
    this['@class'] = RegisteredServiceReverseMappedRegexAttributeFilter.cName;
  }
}

export class RegisteredServiceMutantRegexAttributeFilter extends RegisteredServiceMappedRegexAttributeFilter {
    static cName = 'org.apereo.cas.services.support.RegisteredServiceMutantRegexAttributeFilter';

    static instanceof(obj: any): boolean {
        return obj && obj['@class'] === RegisteredServiceMutantRegexAttributeFilter.cName;
    }

    constructor(filter?: RegisteredServiceAttributeFilter) {
        super(filter);
        this['@class'] = RegisteredServiceMutantRegexAttributeFilter.cName;
    }
}

export class RegisteredServiceScriptedAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceScriptedAttributeFilter';

  script: string;
  order: number;

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceScriptedAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceScriptedAttributeFilter = RegisteredServiceScriptedAttributeFilter.instanceof(filter)
      ? filter as RegisteredServiceScriptedAttributeFilter : undefined;
    this.script = (f && f.script) || null;
    this.order = (f && f.order) || null;
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
