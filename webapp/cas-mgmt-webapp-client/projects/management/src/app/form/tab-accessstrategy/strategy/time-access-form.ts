import {BaseAccessForm} from './base-access-form';
import {
  TimeBasedRegisteredServiceAccessStrategy,
  MgmtFormControl
} from 'mgmt-lib';

export class TimeAccessForm extends BaseAccessForm<TimeBasedRegisteredServiceAccessStrategy> {

  constructor(public strat: TimeBasedRegisteredServiceAccessStrategy) {
    super(strat);
    this.addControl('startingDatetime', new MgmtFormControl(null));
    this.addControl('endingDatetime', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm  = super.formMap();
    frm['startingDatetime'] = this.strat.startingDateTime;
    frm['endingDatetime'] = this.strat.endingDateTime;
    return frm;
  }

  mapForm(strat: TimeBasedRegisteredServiceAccessStrategy) {
    super.mapForm(strat);
    const frm = this.value;
    strat.startingDateTime = frm.startingDatetime;
    strat.endingDateTime = frm.endingDatetime;
  }
}
