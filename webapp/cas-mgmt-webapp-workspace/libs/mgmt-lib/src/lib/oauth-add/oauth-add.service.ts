import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OAuthRegisteredService, OidcRegisteredService} from 'domain-lib';
import {Service} from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class OauthAddService extends Service {

  createOAuthService(): Observable<OAuthRegisteredService> {
    return this.get<OAuthRegisteredService>('api/oauth/generate', 'Creating OAuth Service');
  }

  createOidcService(): Observable<OidcRegisteredService> {
    return this.get<OidcRegisteredService>('api/oidc/generate', 'Creating OIDC Service');
  }
}
