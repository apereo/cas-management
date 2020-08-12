/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {History} from 'domain-lib';
import {SpinnerService} from 'shared-lib';
import {HistoryService} from './history.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HistoryResolve implements Resolve<History[]> {

  constructor(private service: HistoryService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<History[]> | History[] {
    const param: string = route.params.fileName;
    if (param) {
      return this.service.history(param);
    }
    return [];
  }
}
