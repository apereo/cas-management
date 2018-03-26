/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ServiceItem} from '../../domain/service-item';
import {ServiceViewService} from './service.service';

@Injectable()
export class ServicesResolve implements Resolve<ServiceItem[]> {

  constructor(private service: ServiceViewService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ServiceItem[]> {
    return this.service.getServices()
      .then(resp => resp && resp.length > 0 ? resp : null);
  }
}
