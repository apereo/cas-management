import {AbstractControl, FormArray, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {
  AbstractRegisteredService,
  AccessStrategyType,
  DataRecord,
  DefaultRegisteredServiceAccessStrategy,
  DefaultRegisteredServiceDelegatedAuthenticationPolicy,
  GroovyRegisteredServiceAccessStrategy,
  GroovySurrogateRegisteredServiceAccessStrategy,
  GrouperRegisteredServiceAccessStrategy,
  MgmtFormControl,
  MgmtFormGroup,
  RegisteredServiceAccessStrategy,
  RemoteEndpointServiceAccessStrategy,
  SurrogateRegisteredServiceAccessStrategy,
  TimeBasedRegisteredServiceAccessStrategy
} from 'mgmt-lib';

export class AccessStrategyForm extends MgmtFormGroup {

  static policyType: AccessStrategyType = AccessStrategyType.DEFAULT;

  grouper: FormGroup;
  remote: FormGroup;
  groovy: FormGroup;
  time: FormGroup;
  surrogate: FormGroup;
  groovySurrogate: FormGroup;
  required: FormGroup;
  rejected: FormGroup;

  constructor(private data: DataRecord) {
    super();
    const strat = this.data.service.accessStrategy;
    const type = this.type(strat);
    const required = new FormArray([]);
    if (strat.requiredAttributes) {
      for (let i = 0; i < Array.from(Object.keys(strat.requiredAttributes)).length; i++) {
        required.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    const rejected = new FormArray([]);
    if (strat.rejectedAttributes) {
      for (let i = 0; i < Array.from(Object.keys(strat.rejectedAttributes)).length; i++) {
        rejected.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    const surrogate = new FormArray([]);
    if (type === AccessStrategyType.SURROGATE
        && (<SurrogateRegisteredServiceAccessStrategy>strat).surrogateRequiredAttributes)  {
      for (let i = 0; i < Array.from(Object.keys((<SurrogateRegisteredServiceAccessStrategy>strat).surrogateRequiredAttributes)).length; i++) {
        surrogate.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    this.remote = new FormGroup({
      endpointUrl: new MgmtFormControl(null, null, this.condtionalReq(AccessStrategyType.REMOTE)),
      responseCodes: new MgmtFormControl(null)
    });
    this.grouper = new FormGroup({
      groupField: new MgmtFormControl(null, null, this.condtionalReq(AccessStrategyType.GROUPER)),
      startingDatetime: new MgmtFormControl(null),
      endingDatetime: new MgmtFormControl(null)
    });
    this.time = new FormGroup({
      startingDatetime: new MgmtFormControl(null),
      endingDatetime: new MgmtFormControl(null)
    });
    this.surrogate = new FormGroup({
      surrogateEnabled: new MgmtFormControl(null),
      attributes: surrogate
    });
    this.required = new FormGroup({
      attributes: required,
      caseInsensitive: new MgmtFormControl(null)
    });
    this.rejected = new FormGroup({
      attributes: rejected
    });
    this.form = new FormGroup({
      type: new MgmtFormControl(null),
      access: new FormGroup({
        sso: new MgmtFormControl(null),
        requireAll: new MgmtFormControl(null),
        unauthorizedUrl: new MgmtFormControl(null)
      }),
      remote: this.remote,
      time: this.time,
      grouper: this.grouper,
      surrogate: this.surrogate,
      groovySurrogate: new MgmtFormControl(null, null, this.condtionalReq(AccessStrategyType.GROOVY_SURROGATE)),
      groovy: new MgmtFormControl(null, null, this.condtionalReq(AccessStrategyType.GROOVY)),
      required: this.required,
      rejected: this.rejected,
      allowedProviders: new MgmtFormControl(null)
    });
    this.form.get('type').valueChanges.subscribe(t => {
      AccessStrategyForm.policyType = t;
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    const strat: RegisteredServiceAccessStrategy = this.data.service.accessStrategy;
    const type: AccessStrategyType = this.type(strat);
    const frm = {
      type: type,
      access: {
        sso: strat.ssoEnabled,
        requireAll: strat.requireAllAttributes,
        unauthorizedUrl: strat.unauthorizedRedirectUrl,
      },
      remote: {
        endpointUrl: type === AccessStrategyType.REMOTE ? (<RemoteEndpointServiceAccessStrategy>strat).endpointUrl : null,
        responseCodes: type === AccessStrategyType.REMOTE ? (<RemoteEndpointServiceAccessStrategy>strat).acceptableResponseCodes : null,
      },
      time: {
        startingDatetime: type === AccessStrategyType.TIME ? (<TimeBasedRegisteredServiceAccessStrategy>strat).startingDateTime : null,
        endingDatetime: type === AccessStrategyType.TIME ? (<TimeBasedRegisteredServiceAccessStrategy>strat).endingDateTime : null
      },
      grouper: {
        groupField: type === AccessStrategyType.GROUPER ? (<GrouperRegisteredServiceAccessStrategy>strat).groupField : null,
        startingDatetime: type === AccessStrategyType.GROUPER ? (<GrouperRegisteredServiceAccessStrategy>strat).startingDateTime : null,
        endingDatetime: type === AccessStrategyType.GROUPER ? (<GrouperRegisteredServiceAccessStrategy>strat).endingDateTime : null
      },
      surrogate: {
        surrogateEnabled: type === AccessStrategyType.SURROGATE ? (<SurrogateRegisteredServiceAccessStrategy>strat).surrogateEnabled : null,
        attributes: []
      },
      groovySurrogate: type === AccessStrategyType.GROOVY_SURROGATE ? (<GroovySurrogateRegisteredServiceAccessStrategy>strat).groovyScript : null,
      groovy: type === AccessStrategyType.GROOVY ? (<GroovyRegisteredServiceAccessStrategy>strat).groovyScript : null,
      required: {
        attributes: [],
        caseInsensitive: strat.caseInsensitive
      },
      rejected: {
        attributes: []
      },
      allowedProviders: (strat.delegatedAuthenticationPolicy && strat.delegatedAuthenticationPolicy.allowedProviders) || null
    };
    if (strat.requiredAttributes) {
      for (let a of Array.from(Object.keys(strat.requiredAttributes))) {
        frm.required.attributes.push({
          key: a,
          value: strat.requiredAttributes[a].toString()
        });
      }
    }
    if (strat.rejectedAttributes) {
      for (let a of Array.from(Object.keys(strat.rejectedAttributes))) {
        frm.rejected.attributes.push({
          key: a,
          value: strat.rejectedAttributes[a].toString()
        });
      }
    }
    if (type === AccessStrategyType.SURROGATE
        && (<SurrogateRegisteredServiceAccessStrategy>strat).surrogateRequiredAttributes) {
      for (let a of Array.from(Object.keys((<SurrogateRegisteredServiceAccessStrategy>strat).surrogateRequiredAttributes))) {
        frm.surrogate.attributes.push({
          key: a,
          value: (<SurrogateRegisteredServiceAccessStrategy>strat).surrogateRequiredAttributes[a].toString()
        });
      }
    }
    return frm;
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    service.accessStrategy = new DefaultRegisteredServiceAccessStrategy(service.accessStrategy);
    if (frm.type === AccessStrategyType.REMOTE) {
      service.accessStrategy = new RemoteEndpointServiceAccessStrategy(service.accessStrategy);
      (<RemoteEndpointServiceAccessStrategy>service.accessStrategy).endpointUrl = frm.remote.endpointUrl;
      (<RemoteEndpointServiceAccessStrategy>service.accessStrategy).acceptableResponseCodes = frm.remote.responseCodes;
    }
    if (frm.type === AccessStrategyType.TIME) {
      service.accessStrategy = new TimeBasedRegisteredServiceAccessStrategy(service.accessStrategy);
      (<TimeBasedRegisteredServiceAccessStrategy>service.accessStrategy).startingDateTime = frm.time.startingDatetime;
      (<TimeBasedRegisteredServiceAccessStrategy>service.accessStrategy).endingDateTime = frm.time.endingDatetime;
    }
    if (frm.type === AccessStrategyType.GROUPER) {
      service.accessStrategy = new GrouperRegisteredServiceAccessStrategy(service.accessStrategy);
      (<GrouperRegisteredServiceAccessStrategy>service.accessStrategy).groupField = frm.grouper.groupField;
      (<GrouperRegisteredServiceAccessStrategy>service.accessStrategy).startingDateTime = frm.grouper.startingDatetime;
      (<GrouperRegisteredServiceAccessStrategy>service.accessStrategy).endingDateTime = frm.grouper.endingDatetime;
    }
    if (frm.type === AccessStrategyType.SURROGATE) {
      service.accessStrategy = new SurrogateRegisteredServiceAccessStrategy(service.accessStrategy);
      (<SurrogateRegisteredServiceAccessStrategy>service.accessStrategy).surrogateEnabled = frm.surrogate.surrogateEnabled;
      if (frm.surrogate.attributes) {
        (<SurrogateRegisteredServiceAccessStrategy>service.accessStrategy).surrogateRequiredAttributes = new Map<String, String[]>();
        for (let c of frm.surrogate.attributes) {
          (<SurrogateRegisteredServiceAccessStrategy>service.accessStrategy).surrogateRequiredAttributes[c.key] = c.value.split(",");
        }
      }
    }
    if (frm.type === AccessStrategyType.GROOVY_SURROGATE) {
      service.accessStrategy = new GroovySurrogateRegisteredServiceAccessStrategy(service.accessStrategy);
      (<GroovySurrogateRegisteredServiceAccessStrategy>service.accessStrategy).groovyScript = frm.groovySurrogate;
    }
    if (frm.type === AccessStrategyType.GROOVY) {
      service.accessStrategy = new GroovyRegisteredServiceAccessStrategy(service.accessStrategy);
      (<GroovyRegisteredServiceAccessStrategy>service.accessStrategy).groovyScript = frm.groovy;
    }
    service.accessStrategy.ssoEnabled = frm.sso;
    service.accessStrategy.requireAllAttributes = frm.requireAll;
    service.accessStrategy.unauthorizedRedirectUrl = frm.unauthorizedUrl;

    if (frm.required.attributes) {
      service.accessStrategy.requiredAttributes = new Map<String, String[]>();
      for (let c of frm.required.attributes) {
        service.accessStrategy.requiredAttributes[c.key] = c.value.split(",");
      }
    }
    service.accessStrategy.caseInsensitive = frm.required.caseInsensitive;
    if (frm.rejected.attributes) {
      service.accessStrategy.rejectedAttributes = new Map<String, String[]>();
      for (let c of frm.rejected.attributes) {
        service.accessStrategy.rejectedAttributes[c.key] = c.value.split(",");
      }
    }
    if (frm.allowedProviders) {
      service.accessStrategy.delegatedAuthenticationPolicy = new DefaultRegisteredServiceDelegatedAuthenticationPolicy();
      service.accessStrategy.delegatedAuthenticationPolicy.allowedProviders = frm.allowedProviders;
    }
  }

  type(strat: RegisteredServiceAccessStrategy) {
    if (RemoteEndpointServiceAccessStrategy.instanceOf(strat)) {
      return AccessStrategyType.REMOTE;
    }
    if (TimeBasedRegisteredServiceAccessStrategy.instanceOf(strat)) {
      return AccessStrategyType.TIME;
    }
    if (GrouperRegisteredServiceAccessStrategy.instanceOf(strat)) {
      return AccessStrategyType.GROUPER;
    }
    if (SurrogateRegisteredServiceAccessStrategy.instanceOf(strat)) {
      return AccessStrategyType.SURROGATE;
    }
    if (GroovySurrogateRegisteredServiceAccessStrategy.instanceOf(strat)) {
      return AccessStrategyType.GROOVY_SURROGATE
    }
    if (GroovyRegisteredServiceAccessStrategy.instanceOf(strat)) {
      return AccessStrategyType.GROOVY;
    }
    return AccessStrategyType.DEFAULT;
  }

  condtionalReq(type: AccessStrategyType): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (AccessStrategyForm.policyType === type) {
        return control.value == null || control.value.length === 0 ? {'required': true } : null;
      }
      return null;
    };
  }
}

