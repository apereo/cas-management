import {Component, Input, OnInit} from '@angular/core';
import {ServiceTicketExpForm} from './service-ticket-exp.form';

@Component({
  selector: 'lib-service-ticket-exp',
  templateUrl: './service-ticket-exp.component.html',
  styleUrls: ['./service-ticket-exp.component.css']
})
export class ServiceTicketExpComponent implements OnInit {

  @Input()
  form: ServiceTicketExpForm;

  constructor() { }

  ngOnInit() {
  }

}
