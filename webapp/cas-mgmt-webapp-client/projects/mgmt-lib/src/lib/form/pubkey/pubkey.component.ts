import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {ValidatorFn} from '@angular/forms';

@Component({
  selector: 'lib-pubkey',
  templateUrl: './pubkey.component.html'
})
export class PubkeyComponent implements OnInit {

  algorithm: MgmtFormControl;
  location: MgmtFormControl;


  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.location = new MgmtFormControl(this.data.service.publicKey.location, this.data.original.publicKey.location,
      ValidatorFn.);
    this.algorithm = new MgmtFormControl(this.data.service.publicKey.algorithm, this.data.original.publicKey.algorithm);
  }

}
