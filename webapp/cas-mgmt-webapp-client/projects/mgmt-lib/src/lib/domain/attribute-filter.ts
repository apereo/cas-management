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
    const f: RegisteredServiceChainingAttributeFilter = filter as RegisteredServiceChainingAttributeFilter;
    this.filters = (f && f.filters) || null;
    this['@class'] = RegisteredServiceChainingAttributeFilter.cName;
  }
}

export class RegisteredServiceRegexAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceRegexAttributeFilter';

  order: number;
  pattern: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceRegexAttributeFilter = filter as RegisteredServiceRegexAttributeFilter;
    this.order = (f && f.order) || null;
    this.pattern = (f && f.pattern) || null;
    this['@class'] = RegisteredServiceRegexAttributeFilter.cName;
  }
}

export class RegisteredServiceMappedRegexAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceMappedRegexAttributeFilter';

  patterns: Map<String, String>;
  excludeUnmappedAttributes: boolean;
  caseInsensitive: boolean;
  completeMatch: boolean;
  order: number;

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceMappedRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceMappedRegexAttributeFilter = filter as RegisteredServiceMappedRegexAttributeFilter;
    this.patterns = (f && f.patterns) || null;
    this.excludeUnmappedAttributes = (f && f.excludeUnmappedAttributes) || null;
    this.caseInsensitive = (f && f.caseInsensitive) || null;
    this.completeMatch = (f && f.completeMatch) || null;
    this.order = (f && f.order) || null;
    this['@class'] = RegisteredServiceMappedRegexAttributeFilter.cName;
  }
}

export class RegisteredServiceReverseMappedRegexAttributeFilter extends RegisteredServiceMappedRegexAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceReverseMappedRegexAttributeFilter';

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceReverseMappedRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceMappedRegexAttributeFilter) {
    super(filter);
    this['@class'] = RegisteredServiceReverseMappedRegexAttributeFilter.cName;
  }
}

export class RegisteredServiceMutantRegexAttributeFilter extends RegisteredServiceMappedRegexAttributeFilter {
    static cName = 'org.apereo.cas.services.support.RegisteredServiceMutantRegexAttributeFilter';

    static instanceof(obj: any): boolean {
        return obj && obj['@class'] === RegisteredServiceMutantRegexAttributeFilter.cName;
    }

    constructor(filter?: RegisteredServiceMappedRegexAttributeFilter) {
        super(filter);
        this['@class'] = RegisteredServiceMutantRegexAttributeFilter.cName;
    }
}

export class RegisteredServiceScriptedAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceScriptedAttributeFilter';

  script: String;
  order: number;

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceScriptedAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceAttributeFilter) {
    super();
    const f: RegisteredServiceScriptedAttributeFilter = filter as RegisteredServiceScriptedAttributeFilter;
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
  MUTANT_REGEX
}
