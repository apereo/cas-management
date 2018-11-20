import {Component, forwardRef, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {RegisteredServicePublicKey} from '../../domain/public-key';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-pubkey',
  templateUrl: './pubkey.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => PubkeyComponent)
  }]
})
export class PubkeyComponent extends HasControls implements OnInit {

  algorithm: MgmtFormControl;
  location: MgmtFormControl;
  key: RegisteredServicePublicKey;
  original: RegisteredServicePublicKey;

  constructor(public data: DataRecord) {
    super();
    this.key = data.service.publicKey;
    this.original = data.original && data.original.publicKey;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('algorithm', this.algorithm);
    c.set('location', this.location);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    const ky: any = this.key ? this.key : {};
    this.location = new MgmtFormControl(ky.location, og.location);
    this.algorithm = new MgmtFormControl(ky.algorithm, og.algorithm);
  }

}
