/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { History } from '../../domain/history';
import {HistoryService} from './history.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HistoryResolve implements Resolve<History[]> {

  constructor(private service: HistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<History[]> {
    const param: string = route.params['fileName'];

    if (!param) {
      return new Observable();
    } else {
      return this.service.history(param)
        .pipe(
          take(1),
          map(resp => resp ? resp : null)
        );
    }
  }
}
