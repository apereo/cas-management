import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AbstractRegisteredService, OAuthRegisteredService} from 'domain-lib';
import {map} from 'rxjs/operators';
import {OauthAddService} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class OAuthResolve implements Resolve<AbstractRegisteredService[]> {

  constructor(private service: OauthAddService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService[]>
                                                                    | AbstractRegisteredService[] {
    return this.service.createOAuthService()
      .pipe(
        map(v => [new OAuthRegisteredService(v), null]),
      );
  }
}
