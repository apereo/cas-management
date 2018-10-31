import {Component, OnInit} from '@angular/core';
import {RegisteredServicePublicKeyImpl} from '../../domain/public-key';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-pubkey',
  templateUrl: './pubkey.component.html'
})
export class PubkeyComponent implements OnInit {

  algorithm: String;
  location: String;

  constructor(public data: DataRecord) {
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
