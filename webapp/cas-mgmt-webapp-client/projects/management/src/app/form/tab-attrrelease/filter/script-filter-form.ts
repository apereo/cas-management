import {BaseFilterForm} from './filter-form';
import {RegisteredServiceScriptedAttributeFilter, MgmtFormControl, FilterType} from 'mgmt-lib';
import {FormControl} from '@angular/forms';

export class ScriptFilterForm extends BaseFilterForm<RegisteredServiceScriptedAttributeFilter> {

  type = FilterType.SCRIPTED;

  constructor(public filter: RegisteredServiceScriptedAttributeFilter) {
    super(filter);
    this.addControl('script', new MgmtFormControl(null));
    this.addControl('order', new MgmtFormControl(null));
    this.addControl('type', new FormControl(this.type));
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      script: this.filter.script,
      order: this.filter.order,
      type: this.type
    };
  }

  mapForm(filter: RegisteredServiceScriptedAttributeFilter) {
    const frm = this.value;
    filter.script = frm.script;
    filter.order = frm.order;
  }
}
