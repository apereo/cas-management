/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ServiceItem, SpinnerService} from 'mgmt-lib';
import {ServiceViewService} from './service.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: ServiceViewService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> | ServiceItem[] {
    const param: string = route.params['domain'];
    if (param) {
      this.spinner.start('Loading services');
      return this.service.getServices(param).pipe(finalize(() => this.spinner.stop()));
    }
    return [];
  }
}
