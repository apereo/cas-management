import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';
import {SpinnerService, OAuthRegisteredService} from 'mgmt-lib';
import {OAuthService} from '../core/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class OAuthFormResolve implements Resolve<OAuthRegisteredService> {

  constructor(private service: OAuthService, private spinner: SpinnerService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OAuthRegisteredService> | OAuthRegisteredService {
    const param: number = +route.params['id'];
    if (param < 0) {
      return this.service.getNewService().pipe(finalize(() => this.spinner.stop()));
    }
    this.spinner.start('Loading service');
    return this.service.getService(param).pipe(finalize(() => this.spinner.stop()));
  }
}
