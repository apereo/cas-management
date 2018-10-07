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

  constructor() {
    super();
    this.filters = [];
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

  constructor(filter?) {
    super();
    this['@class'] = RegisteredServiceRegexAttributeFilter.cName;
  }
}

export class RegisteredServiceMappedRegexAttributeFilter extends RegisteredServiceAttributeFilter {
  static cName = 'org.apereo.cas.services.support.RegisteredServiceMappedRegexAttributeFilter';

  patterns: Map<String, String>;
  excludeUnmappedAttributes: boolean;
  caseInsensitve: boolean;
  completeMatch: boolean;
  order: number;

  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceMappedRegexAttributeFilter.cName;
  }

  constructor(filter?: RegisteredServiceMappedRegexAttributeFilter) {
    super();
    this.patterns = filter ? filter.patterns : new Map<String, String>();
    this.excludeUnmappedAttributes = filter && filter.excludeUnmappedAttributes;
    this.caseInsensitve = filter && filter.caseInsensitve;
    this.completeMatch = filter && filter.completeMatch;
    this.order = filter && filter.order;
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

  constructor() {
    super();
    this['@class'] = RegisteredServiceScriptedAttributeFilter.cName;
  }
}
