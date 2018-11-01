import {Component, OnInit} from '@angular/core';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-oauthclient',
  templateUrl: './oauthclient.component.html'
})
export class OauthclientComponent implements OnInit {

  service: OAuthRegisteredService;
  original: OAuthRegisteredService;
  showOAuthSecret: boolean;

  constructor(public data: DataRecord) {
    this.service = data.service as OAuthRegisteredService;
    this.original = data.original && data.original as OAuthRegisteredService;
  }

  ngOnInit() {

  }

  isOidc() {
    return OidcRegisteredService.instanceOf(this.data.service);
  }
}
