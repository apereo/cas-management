import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OidcRegisteredService, AbstractRegisteredService, OauthAddService} from '@apereo/mgmt-lib';

/**
 * Resolver to create a new OIDC service.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class OidcResolve implements Resolve<AbstractRegisteredService> {

  constructor(private service: OauthAddService) {

  }

  /**
   * Calls the server to generate a new OIDC service.
   *
   * @param route - route snapshot
   * @param state - route state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService>
                                                                    | AbstractRegisteredService {
    return this.service.createOidcService();
  }
}
