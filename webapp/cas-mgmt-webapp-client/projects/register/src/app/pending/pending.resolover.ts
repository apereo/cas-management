/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';
import {PendingItem, SpinnerService} from 'mgmt-lib';
import {RegisterService} from '../core/register.servivce';

@Injectable({
  providedIn: 'root'
})
export class PendingResolve implements Resolve<PendingItem[]> {

  constructor(private service: RegisterService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PendingItem[]> {
    this.spinner.start('Loading pending services');
    return this.service.getSubmissions().pipe(finalize(() => this.spinner.stop()));
  }
}
