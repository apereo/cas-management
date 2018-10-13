import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {WSFederationRegisterdService} from '../../../../domain/wsed-service';
import {OidcRegisteredService} from '../../../../domain/oauth-service';

@Component({
  selector: 'app-oidc-options',
  templateUrl: './oidc-options.component.html',
  styleUrls: ['./oidc-options.component.css']
})
export class OidcOptionsComponent implements OnInit {

  isOidc: boolean;
  isWsFed: boolean;
  oidcService: OidcRegisteredService;
  original: OidcRegisteredService;

  constructor(public messages: Messages,
              public data: Data) {
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
