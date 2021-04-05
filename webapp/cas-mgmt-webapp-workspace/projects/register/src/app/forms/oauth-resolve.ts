import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AbstractRegisteredService, OauthAddService} from '@apereo/mgmt-lib';

/**
 * Resolver for creating a new OAuthRegisteredService.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class OAuthResolve implements Resolve<AbstractRegisteredService> {

  constructor(private service: OauthAddService) {

  }

  /**
   * Calls the server to get a newly created OAuth service.
   *
   * @param route - route snapshot
   * @param state - route state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService>
                                                                    | AbstractRegisteredService {
    return this.service.createOAuthService();
  }
}
