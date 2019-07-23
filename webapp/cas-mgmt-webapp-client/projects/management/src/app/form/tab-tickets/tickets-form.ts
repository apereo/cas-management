import {FormGroup} from '@angular/forms';
import {MgmtFormGroup} from 'mgmt-lib';
import {AbstractRegisteredService} from 'domain-lib';
import {ServiceTicketForm} from '@app/form/tab-tickets/service-ticket-form';
import {ProxyTicketForm} from '@app/form/tab-tickets/proxy-ticket-form';

export class TicketsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: AbstractRegisteredService) {
    super({
      serviceTicketExpirationPolicy: new ServiceTicketForm(service.serviceTicketExpirationPolicy),
      proxyTicketExpirationPolicy: new ProxyTicketForm(service.proxyTicketExpirationPolicy),
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      serviceTicketExpirationPolicy: (<ServiceTicketForm>this.get('serviceTicketExpirationPolicy')).formMap(),
      proxyTicketExpirationPolicy: (<ProxyTicketForm>this.get('proxyTicketExpirationPolicy')).formMap(),
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.value;
    (<ServiceTicketForm>this.get('serviceTicketExpirationPolicy')).mapForm(service.serviceTicketExpirationPolicy);
    (<ProxyTicketForm>this.get('proxyTicketExpirationPolicy')).mapForm(service.proxyTicketExpirationPolicy);
  }
}
