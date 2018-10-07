/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ServiceItem} from '../../domain/service-item';
import {ServiceViewService} from './service.service';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: ServiceViewService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> | ServiceItem[] {
    const param: String = route.params['domain'];
    return param ? this.service.getServices(param).pipe(take(1)) : [];
  }
}
