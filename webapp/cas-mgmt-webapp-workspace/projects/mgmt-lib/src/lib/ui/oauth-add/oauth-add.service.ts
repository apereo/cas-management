import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OAuthRegisteredService, OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '../service';
import {map, take} from 'rxjs/operators';

/**
 * Service that makes call to the server to create and return new services.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class OauthAddService extends Service {

  /**
   * Returns an OAuth registered service that is created on the server.
   */
  createOAuthService(): Observable<OAuthRegisteredService> {
    return this.get<OAuthRegisteredService>('api/oauth/generate', 'Creating OAuth Service')
      .pipe(
        take(1),
        map(s => new OAuthRegisteredService(s))
      );
  }

  /**
   * Returns an OIDC registered service that is create on the server.
   */
  createOidcService(): Observable<OidcRegisteredService> {
    return this.get<OidcRegisteredService>('api/oauth/generate/oidc', 'Creating OIDC Service')
      .pipe(
        take(1),
        map(s => new OidcRegisteredService(s))
      );
  }
}
