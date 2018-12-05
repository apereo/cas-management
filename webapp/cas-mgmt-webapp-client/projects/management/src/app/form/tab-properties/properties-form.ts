import {FormArray, FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService,
  DefaultRegisteredServiceProperty
} from 'mgmt-lib';

export class PropertiesForm extends MgmtFormGroup {

  constructor(private data: DataRecord) {
    super();
    const props = new FormArray([]);
    if (this.data.service.properties) {
      for (let i = 0; i < Array.from(Object.keys(this.data.service.properties)).length; i++) {
        props.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    this.form = new FormGroup({
      properties: props
    })
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    const props = {
      properties: []
    }
    if (this.data.service.properties) {
      for (let p of Array.from(Object.keys(this.data.service.properties))) {
        props.properties.push({
          key: p,
          value: this.data.service.properties[p].values.toString()
        });
      }
    }
    return props;
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    service.properties = new Map<String, DefaultRegisteredServiceProperty>();
    for (let p of frm.properties) {
      const drp = new DefaultRegisteredServiceProperty();
      drp.values = p.value.split(',');
      service.properties[p.key] = drp;
    }
  }
}
