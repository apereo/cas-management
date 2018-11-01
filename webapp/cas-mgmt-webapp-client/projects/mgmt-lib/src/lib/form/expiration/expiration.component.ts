import { Component, OnInit } from '@angular/core';
import {RegisteredServiceExpirationPolicy} from '../../domain/expiration';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-expiration',
  templateUrl: './expiration.component.html',
  styleUrls: ['./expiration.component.css']
})
export class ExpirationComponent implements OnInit {

  policy: RegisteredServiceExpirationPolicy;
  original: RegisteredServiceExpirationPolicy;

  constructor(public data: DataRecord) {
    this.policy = data.service.expirationPolicy;
    this.original = data.original && data.original.expirationPolicy;
  }

  ngOnInit() {
  }

}
