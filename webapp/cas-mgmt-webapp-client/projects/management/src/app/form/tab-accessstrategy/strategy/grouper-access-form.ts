import {
  GrouperRegisteredServiceAccessStrategy,
  MgmtFormControl
} from 'mgmt-lib';
import {BaseAccessForm} from './base-access-form';
import {Validators} from '@angular/forms';

export class GrouperAccessForm extends BaseAccessForm<GrouperRegisteredServiceAccessStrategy> {

  constructor(public strategy: GrouperRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('groupField', new MgmtFormControl(null, null, Validators.required));
    this.addControl('startingDatetime', new MgmtFormControl(null));
    this.addControl('endingDatetime', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['groupField'] = this.strategy.groupField;
    frm['startingDatetime'] = this.strategy.startingDateTime;
    frm['endingDatetime'] = this.strategy.endingDateTime;
    return frm;
  }

  mapForm(strat: GrouperRegisteredServiceAccessStrategy) {
    const frm = this.value;
    super.mapForm(strat);
    strat.groupField = frm.groupField;
    strat.startingDateTime = frm.startingDatetime;
    strat.endingDateTime = frm.endingDatetime;
  }
}
