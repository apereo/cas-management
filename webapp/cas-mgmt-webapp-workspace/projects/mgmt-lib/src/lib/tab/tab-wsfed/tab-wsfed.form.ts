import {FormGroup} from '@angular/forms';
import {WSFederationRegisterdService, AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, WsfedclientForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating Ws Fed options for a service.
 *
 * @author Travis Schmidt
 */
export class TabWsfedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get wsfed() { return this.get('wsfed') as WsfedclientForm; }
  set wsfed(c: WsfedclientForm) { this.setControl('wsfed', c); }

  constructor(private service: WSFederationRegisterdService) {
    super({});
    this.reset();
  }

  /**
   * Creates o rests controls in the form.
   */
  reset(): void {
    this.wsfed = new WsfedclientForm(this.service);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    this.wsfed.map(service as WSFederationRegisterdService);
  }
}
