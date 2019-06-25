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
    this.spinner.start('Loading service');
    const param: string = route.params['id'];
    if (param.indexOf('json') > -1) {
      return this.service.pending(param).pipe(finalize(() => this.spinner.stop()));
    } else if (+param < 0) {
      return this.service.getNewService().pipe(finalize(() => this.spinner.stop()));
    } else {
      return this.service.getService(+param).pipe(finalize(() => this.spinner.stop()));
    }
  }
}
