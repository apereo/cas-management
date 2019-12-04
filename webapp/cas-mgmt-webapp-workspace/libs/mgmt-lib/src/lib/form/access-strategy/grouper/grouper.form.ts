import {TimeForm} from '../time/time.form';
import {GrouperRegisteredServiceAccessStrategy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class GrouperForm extends TimeForm {

  get groupField() { return this.get('groupField') as MgmtFormControl; }

  constructor(strategy: GrouperRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('groupField', new MgmtFormControl(strategy && strategy.groupField));
  }

  mapForm(strategy: GrouperRegisteredServiceAccessStrategy) {
    strategy.groupField = this.groupField.value;
    super.mapForm(strategy);
  }
}
