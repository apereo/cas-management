import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, DefaultRegisteredServiceProperty} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, AttributesForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating custom properties in a service.
 *
 * @author Travis Schmidt
 */
export class TabPropertiesForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get properties() { return this.get('properties') as AttributesForm; }
  set properties(c: AttributesForm) { this.setControl('properties', c); }

  constructor(private service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets the controls in the form.
   */
  reset(): void {
    this.properties =
      new AttributesForm(this.unpack(this.service?.properties ?? new Map<string, DefaultRegisteredServiceProperty>()));
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.properties = new Map<string, DefaultRegisteredServiceProperty>();
    for (const p of this.properties.rows()) {
      const drp = new DefaultRegisteredServiceProperty();
      drp.values = p.value.split(',');
      service.properties[p.key.value] = drp;
    }
  }

  /**
   * Unpacks the properties for display.
   *
   * @param props - Map<string, DefaultRegisteredServiceProperty>
   */
  unpack(props: Map<string, DefaultRegisteredServiceProperty>): Map<string, string[]> {
    const ret = new Map<string, string[]>();
    Object.keys(props).forEach(k => {
      ret.set(k, props.get(k).values);
    });
    return ret;
  }

}
