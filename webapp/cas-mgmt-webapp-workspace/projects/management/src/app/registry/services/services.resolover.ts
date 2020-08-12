/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ServiceItem} from 'domain-lib';
import {ServiceViewService} from './service.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: ServiceViewService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> | ServiceItem[] {
    const param: string = route.params.domain;
    if (param) {
      return this.service.getServices(param);
    }
    return [];
  }
}
