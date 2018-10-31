import { Component, OnInit } from '@angular/core';
import {WSFederationRegisterdService} from '../../../domain/wsed-service';
import {OidcRegisteredService} from '../../../domain/oauth-service';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-oidc-options',
  templateUrl: './oidc-options.component.html',
  styleUrls: ['./oidc-options.component.css']
})
export class OidcOptionsComponent implements OnInit {

  isOidc: boolean;
  isWsFed: boolean;
  oidcService: OidcRegisteredService;
  original: OidcRegisteredService;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.isOidc = OidcRegisteredService.instanceOf(this.data.service);
    this.isWsFed = WSFederationRegisterdService.instanceOf(this.data.service);
    if (this.isOidc) {
      this.oidcService = this.data.service as OidcRegisteredService;
      this.original = this.data.original as OidcRegisteredService;
    }
  }

}
