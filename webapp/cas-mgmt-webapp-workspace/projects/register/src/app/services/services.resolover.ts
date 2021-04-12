import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {ServiceItem} from '@apereo/mgmt-lib';
import {RegisterService} from '../core/register.servivce';

/**
 * Resolver to retrieve user services before navigation to the ServicesComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: RegisterService) {}

  /**
   * Returns a list of services for the user.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> {
    return this.service.getServices();
  }
}
