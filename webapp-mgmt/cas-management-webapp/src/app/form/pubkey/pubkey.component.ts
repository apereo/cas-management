import {Component, OnInit, Input} from '@angular/core';
import {Messages} from '../../messages';
import {AbstractRegisteredService} from '../../../domain/registered-service';
import {RegisteredServicePublicKeyImpl} from '../../../domain/public-key';
import {Data} from '../data';

@Component({
  selector: 'app-pubkey',
  templateUrl: './pubkey.component.html'
})
export class PubkeyComponent implements OnInit {

  algorithm: String;
  location: String;

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
    if (this.data.service.publicKey) {
      this.algorithm = this.data.service.publicKey.algorithm;
      this.location = this.data.service.publicKey.location;
    }
  }

  changeLocation() {
    if (this.algorithm || this.location) {
      this.checkPubKey();
      this.data.service.publicKey.location = this.location;
    } else {
      this.data.service.publicKey = null;
    }
  }

  changeAlgorithm() {
    if (this.algorithm || this.location) {
      this.checkPubKey();
      this.data.service.publicKey.algorithm = this.algorithm;
    } else {
      this.data.service.publicKey = null;
    }
  }

  checkPubKey() {
    if (!this.data.service.publicKey) {
      this.data.service.publicKey = new RegisteredServicePublicKeyImpl();
    }
  }

}
