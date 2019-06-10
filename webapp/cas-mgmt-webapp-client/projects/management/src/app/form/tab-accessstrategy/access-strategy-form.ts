import {FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  AccessStrategyType,
  DefaultRegisteredServiceAccessStrategy,
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
import {RemoteAccessForm} from './strategy/remote-access-form';
import {BaseAccessForm} from './strategy/base-access-form';
import {TimeAccessForm} from './strategy/time-access-form';
import {GrouperAccessForm} from './strategy/grouper-access-form';
import {SurrogateAccessForm} from './strategy/surrogate-access-form';
import {GroovySurrogateAccesForm} from './strategy/groovy-surrogate-acces-form';
import {GroovyAccessForm} from './strategy/groovy-access-form';
import {DefaultAccessForm} from './strategy/default-access-form';

export class StrategyAccessForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  strategy: FormGroup;

  constructor(private serviceAccessStrategy: RegisteredServiceAccessStrategy) {
    super({});
    const strat: RegisteredServiceAccessStrategy = this.serviceAccessStrategy;
    const type: AccessStrategyType = this.findType(strat);
    this.type = new MgmtFormControl(type);
    this.strategy = this.getStrategy(type);
    this.addControl('type', this.type);
    this.addControl('strategy', this.strategy);
    this.type.valueChanges.subscribe(val => this.changeType(val));
  }

  formMap(): any {
    return {};
  }

  changeType(type: AccessStrategyType) {
    const base = this.strategy as BaseAccessForm<RegisteredServiceAccessStrategy>;
    if (type === AccessStrategyType.REMOTE) {
      const remote = new RemoteEndpointServiceAccessStrategy();
      base.mapForm(remote);
      this.strategy = new RemoteAccessForm(remote);
    }
    if (type === AccessStrategyType.TIME) {
      const time = new TimeBasedRegisteredServiceAccessStrategy();
      base.mapForm(time);
      this.strategy = new TimeAccessForm(time);
    }
    if (type === AccessStrategyType.GROUPER) {
      const grouper = new GrouperRegisteredServiceAccessStrategy();
      base.mapForm(grouper);
      this.strategy = new GrouperAccessForm(grouper);
    }
    if (type === AccessStrategyType.SURROGATE) {
      const surrogate = new SurrogateRegisteredServiceAccessStrategy();
      base.mapForm(surrogate);
      this.strategy = new SurrogateAccessForm(surrogate);
    }
    if (type === AccessStrategyType.GROOVY_SURROGATE) {
      const groovySurrogate = new GroovySurrogateRegisteredServiceAccessStrategy();
      base.mapForm(groovySurrogate);
      this.strategy = new GroovySurrogateAccesForm(groovySurrogate);
    }
    if (type === AccessStrategyType.GROOVY) {
      const groovy = new GroovyRegisteredServiceAccessStrategy();
      base.mapForm(groovy);
      this.strategy = new GroovyAccessForm(groovy);
    }
    if (type === AccessStrategyType.DEFAULT) {
      const def = new DefaultRegisteredServiceAccessStrategy();
      base.mapForm(def);
      this.strategy = new DefaultAccessForm(def);
    }
    this.setControl('strategy', this.strategy);
  }

  mapForm(service: AbstractRegisteredService) {
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
    (this.strategy as unknown as MgmtFormGroup<RegisteredServiceAccessStrategy>).mapForm(service.accessStrategy);

  }

  getStrategy(type: AccessStrategyType)  {
    if (type === AccessStrategyType.REMOTE) {
      return new RemoteAccessForm(this.serviceAccessStrategy as RemoteEndpointServiceAccessStrategy);
    }
    if (type === AccessStrategyType.TIME) {
      return new TimeAccessForm(this.serviceAccessStrategy as TimeBasedRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.GROUPER) {
      return new GrouperAccessForm(this.serviceAccessStrategy as GrouperRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.SURROGATE) {
      return new SurrogateAccessForm(this.serviceAccessStrategy as SurrogateRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.GROOVY_SURROGATE) {
      return new GroovySurrogateAccesForm(this.serviceAccessStrategy as GroovySurrogateRegisteredServiceAccessStrategy);
    }
    if (type === AccessStrategyType.GROOVY) {
      return new GroovyAccessForm(this.serviceAccessStrategy as GroovyRegisteredServiceAccessStrategy);
    }
    return new DefaultAccessForm(this.serviceAccessStrategy);
  }

  findType(strat: RegisteredServiceAccessStrategy) {
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


