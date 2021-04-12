import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {Observable} from 'rxjs/internal/Observable';
import {RegistryService} from '../registry.service';

/**
 * Resolver for retrieving services for a domain before navigation to ServicesComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: RegistryService) {}

  /**
   * Returns all the services in a domain in the registry.
   *
   * @param route - route snapshot.
   */
  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> | ServiceItem[] {
    const param: string = route.params.domain;
    if (param) {
      return this.service.getServices(param);
    }
    return [];
  }
}
