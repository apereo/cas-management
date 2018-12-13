/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {History, SpinnerService} from 'mgmt-lib';
import {HistoryService} from './history.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HistoryResolve implements Resolve<History[]> {

  constructor(private service: HistoryService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<History[]> | History[] {
    const param: string = route.params['fileName'];
    if (param) {
      this.spinner.start('Loading history');
      return this.service.history(param).pipe(finalize(() => this.spinner.stop()));
    }
    return [];
  }
}
