/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {finalize, map} from 'rxjs/operators';
import {ServiceItem, SpinnerService} from 'mgmt-lib';
import {OAuthService} from '../core/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: OAuthService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> {
    this.spinner.start('Loading your services');
    return this.service.getServices()
      .pipe(
        finalize(() => this.spinner.stop())
      );
  }
}
