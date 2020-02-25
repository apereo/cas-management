import {TimeBasedRegisteredServiceAccessStrategy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {AccessStrategyForm} from '../access-strategy.form';

export class TimeForm extends AccessStrategyForm {

  get startingDatetime() { return this.get('startingDateTime') as MgmtFormControl; }
  get endingDatetime() { return this.get('endingDateTime') as MgmtFormControl; }

  constructor(strategy: TimeBasedRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('startingDateTime', new MgmtFormControl(strategy?.startingDateTime));
    this.addControl('endingDateTime', new MgmtFormControl(strategy?.endingDateTime));
  }

  mapForm(strategy: TimeBasedRegisteredServiceAccessStrategy) {
    super.mapForm(strategy);
    strategy.startingDateTime = this.startingDatetime.value;
    strategy.endingDateTime = this.endingDatetime.value;
  }
}
