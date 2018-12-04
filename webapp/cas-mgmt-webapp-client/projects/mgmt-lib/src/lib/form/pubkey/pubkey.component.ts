import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-pubkey',
  templateUrl: './pubkey.component.html'
})
export class PubkeyComponent implements OnInit {

  @Input()
  control: FormGroup;
  algorithm: MgmtFormControl;
  location: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.location = this.control.get('location') as MgmtFormControl;
    this.algorithm = this.control.get('algorithm') as MgmtFormControl;
  }

}
