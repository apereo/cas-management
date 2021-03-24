import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {SamlService} from './saml.service';
import {Observable} from 'rxjs/internal/Observable';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Resolver to retrieve all registered saml services in the registry.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SamlResolve implements Resolve<ServiceItem[]> {

  constructor(private service: SamlService) {}

  /**
   * Returns all saml services in the registry.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> | ServiceItem[] {
    return this.service.getServices();
  }
}
