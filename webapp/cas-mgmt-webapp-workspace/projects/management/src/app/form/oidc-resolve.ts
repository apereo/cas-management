import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OidcRegisteredService, AbstractRegisteredService} from 'domain-lib';
import {OauthAddService} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class OidcResolve implements Resolve<AbstractRegisteredService[]> {

  constructor(private service: OauthAddService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService[]>
                                                                    | AbstractRegisteredService[] {
    return this.service.createOidcService()
      .pipe(
        map(v => [new OidcRegisteredService(v), null]),
      );
  }
}
