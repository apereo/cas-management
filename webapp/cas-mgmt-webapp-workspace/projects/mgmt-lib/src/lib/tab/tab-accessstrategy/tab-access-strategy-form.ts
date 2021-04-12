import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  AccessStrategyType, DefaultPrincipalAttributesRepository,
  DefaultRegisteredServiceAccessStrategy,
  GroovyRegisteredServiceAccessStrategy,
  GroovySurrogateRegisteredServiceAccessStrategy,
  GrouperRegisteredServiceAccessStrategy,
  RegisteredServiceAccessStrategy,
  RemoteEndpointServiceAccessStrategy,
  SurrogateRegisteredServiceAccessStrategy,
  TimeBasedRegisteredServiceAccessStrategy,
} from '@apereo/mgmt-lib/src/lib/model';
import {
  AccessStrategyForm,
  RemoteForm,
  TimeForm,
  GrouperForm,
  SurrogateForm,
  MgmtFormGroup
} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating Access Strategy polices for a service.
 *
 * @author Travis Schmidt
 */
export class TabAccessStrategyForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: FormControl;
  get strategy() { return this.get('strategy') as AccessStrategyForm; }
  set strategy(s: AccessStrategyForm) { this.setControl('strategy', s); }

  constructor(private serviceAccessStrategy: RegisteredServiceAccessStrategy) {
    super({});
    this.reset();
  }

  /**
   * Sets the form when created or reset.
   */
  reset(): void {
    this.type = new FormControl(this.findType(this.serviceAccessStrategy));
    this.type.valueChanges.subscribe(val => this.changeType(val));
    this.strategy = this.getStrategy(this.type.value);
  }

  /**
   * Handles changing the type of access strategy in force for the service.
   *
   * @param type - type to switch to
   */
  changeType(type: AccessStrategyType) {
    if (type === AccessStrategyType.REMOTE) {
      this.serviceAccessStrategy = new RemoteEndpointServiceAccessStrategy(this.serviceAccessStrategy);
      this.strategy = new RemoteForm(this.serviceAccessStrategy as RemoteEndpointServiceAccessStrategy);
    }
    if (type === AccessStrategyType.TIME) {
      this.serviceAccessStrategy = new TimeBasedRegisteredServiceAccessStrategy(this.serviceAccessStrategy);
      this.strategy = new TimeForm(this.serviceAccessStrategy as TimeBasedRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.GROUPER) {
      this.serviceAccessStrategy = new GrouperRegisteredServiceAccessStrategy(this.serviceAccessStrategy);
      this.strategy = new GrouperForm(this.serviceAccessStrategy as GrouperRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.SURROGATE) {
      this.serviceAccessStrategy = new SurrogateRegisteredServiceAccessStrategy(this.serviceAccessStrategy);
      this.strategy = new SurrogateForm(this.serviceAccessStrategy as SurrogateRegisteredServiceAccessStrategy);
    }
    /*
    if (type === AccessStrategyType.GROOVY_SURROGATE) {
      const groovySurrogate = new GroovySurrogateRegisteredServiceAccessStrategy();
      this.strategy = new GroovySurrogateAccesForm(groovySurrogate);
    }
    if (type === AccessStrategyType.GROOVY) {
      const groovy = new GroovyRegisteredServiceAccessStrategy();
      base.mapForm(groovy);
      this.strategy = new GroovyAccessForm(groovy);
    }
     */
    if (type === AccessStrategyType.DEFAULT) {
      this.serviceAccessStrategy = new DefaultRegisteredServiceAccessStrategy(this.serviceAccessStrategy);
      this.strategy = new AccessStrategyForm(this.serviceAccessStrategy as DefaultRegisteredServiceAccessStrategy);
    }
    this.strategy.markAsTouched();
    this.strategy.markAsDirty();
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    let svc: RegisteredServiceAccessStrategy;
    if (this.type.value === AccessStrategyType.REMOTE) {
      svc = new RemoteEndpointServiceAccessStrategy();
    }
    if (this.type.value === AccessStrategyType.TIME) {
      svc = new TimeBasedRegisteredServiceAccessStrategy();
    }
    if (this.type.value === AccessStrategyType.GROUPER) {
      svc = new GrouperRegisteredServiceAccessStrategy();
    }
    if (this.type.value === AccessStrategyType.SURROGATE) {
      svc = new SurrogateRegisteredServiceAccessStrategy();
    }
    if (this.type.value === AccessStrategyType.GROOVY_SURROGATE) {
      svc = new GroovySurrogateRegisteredServiceAccessStrategy();
    }
    if (this.type.value === AccessStrategyType.GROOVY) {
      svc = new GroovyRegisteredServiceAccessStrategy();
    }
    if (this.type.value === AccessStrategyType.DEFAULT) {
      svc = new DefaultRegisteredServiceAccessStrategy();
    }
    service.accessStrategy = svc;
    this.strategy.map(service.accessStrategy);
    if ((service.accessStrategy.requiredAttributes && Object.keys(service.accessStrategy.requiredAttributes).length > 0) ||
      (service.accessStrategy.rejectedAttributes && Object.keys(service.accessStrategy.rejectedAttributes).length > 0)) {
      const pr = new DefaultPrincipalAttributesRepository();
      pr.attributeRepositoryIds = ['samlStub', 'ldap'];
      pr.mergingStrategy = 'MULTIVALUED';
      service.accessStrategy.principalAttributesRepository = pr;
    } else {
      service.accessStrategy.principalAttributesRepository = null;
    }
  }

  /**
   * Returns a new AccessStrategyForm for the current strategy by the passed type.
   *
   * @param type - type of form to create.
   */
  getStrategy(type: AccessStrategyType): AccessStrategyForm  {
    if (type === AccessStrategyType.REMOTE) {
      return new RemoteForm(this.serviceAccessStrategy as RemoteEndpointServiceAccessStrategy);
    }
    if (type === AccessStrategyType.TIME) {
      return new TimeForm(this.serviceAccessStrategy as TimeBasedRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.GROUPER) {
      return new GrouperForm(this.serviceAccessStrategy as GrouperRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.SURROGATE) {
      return new SurrogateForm(this.serviceAccessStrategy as SurrogateRegisteredServiceAccessStrategy);
    }
    /*
    if (type === AccessStrategyType.GROOVY_SURROGATE) {
      return new GroovySurrogateAccesForm(this.serviceAccessStrategy as GroovySurrogateRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.GROOVY) {
      return new GroovyAccessForm(this.serviceAccessStrategy as GroovyRegisteredServiceAccessStrategy);
    }
     */
    return new AccessStrategyForm(this.serviceAccessStrategy);
  }

  /**
   * Returns the type that corresponds to the strategy pased.
   *
   * @param strat - RegisteredServiceAccessStrategy
   */
  findType(strat: RegisteredServiceAccessStrategy): AccessStrategyType {
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
      return AccessStrategyType.GROOVY_SURROGATE;
    }
    if (GroovyRegisteredServiceAccessStrategy.instanceOf(strat)) {
      return AccessStrategyType.GROOVY;
    }
    return AccessStrategyType.DEFAULT;
  }

}


