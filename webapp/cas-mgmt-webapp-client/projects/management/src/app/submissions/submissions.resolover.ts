/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {SubmissionsService} from './submissions.service';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';
import {ServiceItem, SpinnerService} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsResolve implements Resolve<ServiceItem[]> {

  constructor(private service: SubmissionsService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> {
    this.spinner.start('Loading submissions');
    return this.service.getSubmissions().pipe(finalize(() => this.spinner.stop()));
  }
}
