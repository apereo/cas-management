import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {OAuthRegisteredService, OidcRegisteredService} from '../../../domain/oauth-service';
import {Data} from '../data';

@Component({
  selector: 'app-oauthclient',
  templateUrl: './oauthclient.component.html'
})
export class OauthclientComponent implements OnInit {

  service: OAuthRegisteredService;
  original: OAuthRegisteredService;
  showOAuthSecret: boolean;

  constructor(public messages: Messages,
              public data: Data) {
    this.service = data.service as OAuthRegisteredService;
    this.original = data.original && data.original as OAuthRegisteredService;
  }

  ngOnInit() {

  }

  isOidc() {
    return OidcRegisteredService.instanceOf(this.data.service);
  }
}
