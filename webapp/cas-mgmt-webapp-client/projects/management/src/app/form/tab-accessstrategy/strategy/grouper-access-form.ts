import {
  GrouperRegisteredServiceAccessStrategy,
  MgmtFormControl
} from 'mgmt-lib';
import {BaseAccessForm} from './base-access-form';

export class GrouperAccessForm extends BaseAccessForm<GrouperRegisteredServiceAccessStrategy> {

  constructor(public strat: GrouperRegisteredServiceAccessStrategy) {
    super(strat);
    this.addControl('groupField', new MgmtFormControl(null));
    this.addControl('startingDatetime', new MgmtFormControl(null));
    this.addControl('endingDatetime', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['groupField'] = this.strat.groupField;
    frm['startingDatetime'] = this.strat.startingDateTime;
    frm['endingDatetime'] = this.strat.endingDateTime;
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
