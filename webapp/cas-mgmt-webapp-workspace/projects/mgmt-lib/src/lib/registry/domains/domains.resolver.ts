import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {DomainService} from './domain.service';
import {DomainRpc} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Resolver to retrieves domains form the server before navigating to DomainsComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class DomainsResolver implements Resolve<DomainRpc[]> {

  constructor(private service: DomainService) {}

  /**
   * Returns list of all domains in the registry.
   *
   * @param route - route snapshot
   * @param state - route state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DomainRpc[]>  {
    return this.service.getDomains();
  }

}
