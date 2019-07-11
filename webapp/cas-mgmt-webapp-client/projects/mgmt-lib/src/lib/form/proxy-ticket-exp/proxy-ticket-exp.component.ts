import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-proxy-ticket-exp',
  templateUrl: './proxy-ticket-exp.component.html',
  styleUrls: ['./proxy-ticket-exp.component.css']
})
export class ProxyTicketExpComponent implements OnInit {

  @Input()
  control: FormGroup;
  numberOfUses: MgmtFormControl;
  timeToLive: MgmtFormControl;

  constructor() { }

  ngOnInit() {
    this.numberOfUses = this.control.get('numberOfUses') as MgmtFormControl;
    this.timeToLive = this.control.get('timeToLive') as MgmtFormControl;
  }

}
