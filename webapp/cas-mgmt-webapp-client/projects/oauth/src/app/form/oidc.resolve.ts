import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';
import {SpinnerService, OAuthRegisteredService} from 'mgmt-lib';
import {OAuthService} from '../core/oauth.service';
import {OAuthAttributeReleasePolicy} from '../../../../mgmt-lib/src/lib/domain/attribute-release';
import {OidcRegisteredService} from '../../../../mgmt-lib/src/lib/domain/oauth-service';
import {OidcService} from '../core/oidc.service';

@Injectable({
  providedIn: 'root'
})
export class OidcFormResolve implements Resolve<OidcRegisteredService> {

  constructor(private service: OidcService, private spinner: SpinnerService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OidcRegisteredService> | OidcRegisteredService {
    const param: number = +route.params['id'];
    if (param < 0) {
      return new OidcRegisteredService();
    }
    this.spinner.start('Loading service');
    return this.service.getService(param).pipe(finalize(() => this.spinner.stop()));
  }
}
