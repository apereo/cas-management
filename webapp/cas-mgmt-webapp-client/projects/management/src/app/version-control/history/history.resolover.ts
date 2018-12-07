/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { History } from 'mgmt-lib';
import {HistoryService} from './history.service';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HistoryResolve implements Resolve<History[]> {

  constructor(private service: HistoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<History[]> | History[] {
    const param: string = route.params['fileName'];
    return param ? this.service.history(param).pipe(take(1)) : [];
  }
}
