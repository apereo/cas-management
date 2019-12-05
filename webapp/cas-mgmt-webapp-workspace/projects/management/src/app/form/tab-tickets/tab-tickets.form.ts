import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, ProxyTicketExpForm, ServiceTicketExpForm} from 'mgmt-lib';
import {AbstractRegisteredService} from 'domain-lib';

export class TabTicketsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get serviceTicket() { return this.get('serviceTicket') as ServiceTicketExpForm; }
  get proxyTicket() { return this.get('proxyTicket') as ProxyTicketExpForm; }

  constructor(service: AbstractRegisteredService) {
    super({
      serviceTicket: new ServiceTicketExpForm(service && service.serviceTicketExpirationPolicy),
      proxyTicket: new ProxyTicketExpForm(service && service.proxyTicketExpirationPolicy),
    });
  }

  mapForm(service: AbstractRegisteredService) {
    service.serviceTicketExpirationPolicy = this.serviceTicket.mapForm();
    service.proxyTicketExpirationPolicy = this.proxyTicket.mapForm();
  }
}
