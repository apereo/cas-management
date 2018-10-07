import { Component, OnInit } from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';
import {RegisteredServiceExpirationPolicy} from '../../../domain/expiration';

@Component({
  selector: 'app-expiration',
  templateUrl: './expiration.component.html',
  styleUrls: ['./expiration.component.css']
})
export class ExpirationComponent implements OnInit {

  policy: RegisteredServiceExpirationPolicy;
  original: RegisteredServiceExpirationPolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.expirationPolicy;
    this.original = data.original && data.original.expirationPolicy;
  }

  ngOnInit() {
  }

}
