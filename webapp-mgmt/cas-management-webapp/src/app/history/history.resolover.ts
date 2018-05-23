/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { History } from '../../domain/history';
import {HistoryService} from './history.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class HistoryResolve implements Resolve<History[]> {

  constructor(private service: HistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<History[]> | History[] {
    const param: string = route.params['fileName'];
    return param ? this.service.history(param) : [];
  }
}
