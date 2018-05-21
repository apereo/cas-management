/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ServiceItem} from '../../domain/service-item';
import {ServiceViewService} from './service.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: ServiceViewService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> {
    const param: String = route.params['domain'];

    if (!param) {
      return new Observable<ServiceItem[]>();
    } else {
      return this.service.getServices(param)
        .pipe(
          take(1),
          map(resp => resp ? resp : null)
        );
    }
  }
}
