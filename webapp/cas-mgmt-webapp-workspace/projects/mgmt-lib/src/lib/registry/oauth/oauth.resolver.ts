import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {OauthService} from './oauth.service';
import {Observable} from 'rxjs/internal/Observable';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Resolver to retrieve list of OAuth services before navigating to OAuthComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class OauthResolve implements Resolve<ServiceItem[]> {

  constructor(private service: OauthService) {}

  /**
   * Returns list of all registered OAuth services in the registry.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> | ServiceItem[] {
    return this.service.getServices();
  }
}
