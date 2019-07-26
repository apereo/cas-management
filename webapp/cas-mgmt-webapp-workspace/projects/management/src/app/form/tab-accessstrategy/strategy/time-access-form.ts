import {BaseAccessForm} from './base-access-form';
import {TimeBasedRegisteredServiceAccessStrategy} from 'domain-lib';
import {MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class TimeAccessForm extends BaseAccessForm<TimeBasedRegisteredServiceAccessStrategy> {

  constructor(public strategy: TimeBasedRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('startingDatetime', new MgmtFormControl(null, null, Validators.required));
    this.addControl('endingDatetime', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm  = super.formMap();
    frm['startingDatetime'] = this.strategy.startingDateTime;
    frm['endingDatetime'] = this.strategy.endingDateTime;
    return frm;
  }

  mapForm(strat: TimeBasedRegisteredServiceAccessStrategy) {
    super.mapForm(strat);
    const frm = this.value;
    strat.startingDateTime = frm.startingDatetime;
    strat.endingDateTime = frm.endingDatetime;
  }
}
