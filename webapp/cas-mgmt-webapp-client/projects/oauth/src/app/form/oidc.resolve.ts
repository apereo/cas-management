import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from 'mgmt-lib';
import {OidcRegisteredService} from 'mgmt-lib';
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
      return this.service.getNewService().pipe(finalize(() => this.spinner.stop()));
    }
    this.spinner.start('Loading service');
    return this.service.getService(param).pipe(finalize(() => this.spinner.stop()));
  }
}