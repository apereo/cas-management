import {Component, Input, OnInit} from '@angular/core';
import {ProxyTicketExpForm} from './proxy-ticket-exp.form';

@Component({
  selector: 'lib-proxy-ticket-exp',
  templateUrl: './proxy-ticket-exp.component.html',
  styleUrls: ['./proxy-ticket-exp.component.css']
})
export class ProxyTicketExpComponent implements OnInit {

  @Input()
  form: ProxyTicketExpForm;

  constructor() { }

  ngOnInit() {
  }

}
