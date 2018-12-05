import {Component, OnInit} from '@angular/core';
import {AccessStrategyForm} from './access-form';
import {
  AccessStrategyType,
  DataRecord,
  FormDataService,
  GrouperRegisteredServiceAccessStrategy,
  RegisteredServiceAccessStrategy,
  RemoteEndpointServiceAccessStrategy,
  SurrogateRegisteredServiceAccessStrategy,
  TimeBasedRegisteredServiceAccessStrategy
} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tab-accessstrategy',
  templateUrl: './tab-accessstrategy.component.html'
})
export class TabAccessstrategyComponent implements OnInit {

  groovyAccessStrategy: boolean;

  accessStrategy: AccessStrategyForm;

  constructor(public data: DataRecord,
              public formData: FormDataService) {
  }

  ngOnInit() {
    if (this.data.formMap.has('accessstrategy')) {
      this.accessStrategy = this.data.formMap.get('accessstrategy') as AccessStrategyForm;
      return;
    }
    this.accessStrategy = new AccessStrategyForm(this.data);
    this.accessStrategy.get('type').valueChanges.subscribe(t => {
      this.changeType(t);
    });
    this.data.formMap.set('accessstrategy', this.accessStrategy);
  }

  changeType(type: AccessStrategyType) {
    this.accessStrategy.grouper.reset();
    this.accessStrategy.remote.reset();
    this.accessStrategy.time.reset();
    this.accessStrategy.surrogate.reset();
    if (type === AccessStrategyType.REMOTE) {
      this.setRemote(this.accessStrategy.get('remote') as FormGroup, new RemoteEndpointServiceAccessStrategy());
    }
    if (type === AccessStrategyType.TIME) {
      this.setTime(this.accessStrategy.get('time') as FormGroup, new TimeBasedRegisteredServiceAccessStrategy());
    }
    if (type === AccessStrategyType.GROUPER) {
      this.setGrouper(this.accessStrategy.get('grouper') as FormGroup, new GrouperRegisteredServiceAccessStrategy());
    }
    if (type === AccessStrategyType.SURROGATE) {
      this.setSurrogate(this.accessStrategy.get('surrogate') as FormGroup, new SurrogateRegisteredServiceAccessStrategy());
    }
    if (type === AccessStrategyType.GROOVY_SURROGATE) {
      this.accessStrategy.get('groovySurrogate').setValue(null);
    }
    if (type === AccessStrategyType.GROOVY) {
      this.accessStrategy.get('groovy').setValue(null);
    }
  }

  setAccess(access: FormGroup, strat: RegisteredServiceAccessStrategy) {
    access.get('sso').setValue(strat.ssoEnabled);
    access.get('requireAll').setValue(strat.requireAllAttributes);
    access.get('unauthorizedUrl').setValue(strat.unauthorizedRedirectUrl);
  }

  setRemote(remote: FormGroup, strat: RemoteEndpointServiceAccessStrategy) {
    remote.get('endpointUrl').setValue(strat.endpointUrl);
    remote.get('responseCodes').setValue(strat.acceptableResponseCodes);
  }

  setTime(time: FormGroup, strat: TimeBasedRegisteredServiceAccessStrategy) {
    time.get('startingDatetime').setValue(strat.startingDateTime);
    time.get('endingDatetime').setValue(strat.endingDateTime);
  }

  setGrouper(grouper: FormGroup, strat: GrouperRegisteredServiceAccessStrategy) {
    grouper.get('groupField').setValue(strat.groupField);
    grouper.get('startingDatetime').setValue(strat.startingDateTime);
    grouper.get('endingDatetime').setValue(strat.endingDateTime);
  }

  setSurrogate(surrogate: FormGroup, strat: SurrogateRegisteredServiceAccessStrategy) {
    surrogate.get('surrogateEnabled').setValue(strat.surrogateEnabled);
    surrogate.get('attributes').setValue(strat.surrogateRequiredAttributes);
  }

  setRequired(required: FormGroup, strat: RegisteredServiceAccessStrategy) {
    required.get('requiredAttributes').setValue(strat.requiredAttributes);
    required.get('caseInsensitive').setValue(strat.caseInsensitive);
  }

}
