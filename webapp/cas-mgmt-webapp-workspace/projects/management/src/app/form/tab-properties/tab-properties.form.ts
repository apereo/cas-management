import {FormGroup} from '@angular/forms';
import {AttributesForm, MgmtFormGroup} from 'mgmt-lib';
import {AbstractRegisteredService, DefaultRegisteredServiceProperty} from 'domain-lib';

export class TabPropertiesForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get properties() { return this.get('properties') as AttributesForm; }
  constructor(service: AbstractRegisteredService) {
    super({});
    this.addControl('properties', new AttributesForm(this.unpack(service?.properties ?? new Map<string, DefaultRegisteredServiceProperty>())));
  }

  mapForm(service: AbstractRegisteredService) {
    service.properties = new Map<string, DefaultRegisteredServiceProperty>();
    for (const p of this.properties.rows()) {
      const drp = new DefaultRegisteredServiceProperty();
      drp.values = p.value.split(',');
      service.properties[p.key.value] = drp;
    }
  }

  unpack(props: Map<string, DefaultRegisteredServiceProperty>): Map<string, string[]> {
    const ret = new Map<string, string[]>();
    Object.keys(props).forEach(k => {
      ret.set(k, props.get(k).values);
    });
    return ret;
  }

}
