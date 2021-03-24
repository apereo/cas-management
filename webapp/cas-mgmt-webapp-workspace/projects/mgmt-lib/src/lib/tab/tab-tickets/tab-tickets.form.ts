import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, ServiceTicketExpForm, ProxyTicketExpForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating ticket expiration policies for a service.
 *
 * @author Travis Schmidt
 */
export class TabTicketsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get serviceTicket() { return this.get('serviceTicket') as ServiceTicketExpForm; }
  set serviceTicket(c: ServiceTicketExpForm) { this.setControl('serviceTicket', c); }
  get proxyTicket() { return this.get('proxyTicket') as ProxyTicketExpForm; }
  set proxyTicket(c: ProxyTicketExpForm) { this.setControl('proxyTicket', c); }

  constructor(private service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates and resets the controls in the form.
   */
  reset(): void {
    this.serviceTicket = new ServiceTicketExpForm(this.service?.serviceTicketExpirationPolicy);
    this.proxyTicket = new ProxyTicketExpForm(this.service?.proxyTicketExpirationPolicy);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.serviceTicketExpirationPolicy = this.serviceTicket.map();
    service.proxyTicketExpirationPolicy = this.proxyTicket.map();
  }
}
