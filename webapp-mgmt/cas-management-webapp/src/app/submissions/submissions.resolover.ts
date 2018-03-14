/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ServiceItem} from '../../domain/service-item';
import {SubmissionsService} from './submissions.service';

@Injectable()
export class SubmissionsResolve implements Resolve<ServiceItem[]> {

  constructor(private service: SubmissionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ServiceItem[]> {
      return this.service.getSubmissions().then(resp => resp ? resp : null);
  }
}
