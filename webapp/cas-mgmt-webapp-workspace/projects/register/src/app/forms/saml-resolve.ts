import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AbstractRegisteredService, SamlRegisteredService, SamlAddService} from '@apereo/mgmt-lib';

/**
 * Resolver to extract the new uploaded SAML service and pass it to the form component.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SamlResolve implements Resolve<AbstractRegisteredService> {

  constructor(private service: SamlAddService) {

  }

  /**
   * Gets the SAML service form the SamlAddService and passes it to the form component.
   *
   * @param route - route snapshot
   * @param state - route state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService>
                                                                    | AbstractRegisteredService {
    return new SamlRegisteredService(this.service.uploaded);
  }
}
