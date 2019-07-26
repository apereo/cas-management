import { Component, OnInit } from '@angular/core';
import {TicketsForm} from '@app/form/tab-tickets/tickets-form';
import {ServiceTicketForm} from '@app/form/tab-tickets/service-ticket-form';
import {ProxyTicketForm} from '@app/form/tab-tickets/proxy-ticket-form';
import {DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-tickets',
  templateUrl: './tab-tickets.component.html',
  styleUrls: ['./tab-tickets.component.css']
})
export class TabTicketsComponent implements OnInit {
  tickets: TicketsForm;
  serviceTicketExpiration: ServiceTicketForm;
  proxyTicketExpiration: ProxyTicketForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('tickets')) {
      this.tickets = this.data.formMap.get('tickets') as TicketsForm;
      this.serviceTicketExpiration = this.tickets.get('serviceTicketExpirationPolicy') as ServiceTicketForm;
      this.proxyTicketExpiration = this.tickets.get('proxyTicketExpirationPolicy') as ProxyTicketForm;
      return;
    }
    this.tickets = new TicketsForm(this.data.service);
    this.serviceTicketExpiration = this.tickets.get('serviceTicketExpirationPolicy') as ServiceTicketForm;
    this.proxyTicketExpiration = this.tickets.get('proxyTicketExpirationPolicy') as ProxyTicketForm;
    this.data.formMap.set('tickets', this.tickets);
  }

  ngOnInit() {
  }

}
