/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { History } from '../../domain/history';
import {HistoryService} from './history.service';

@Injectable()
export class HistoryResolve implements Resolve<History[]> {

  constructor(private service: HistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<History[]> {
    const param: string = route.params['fileName'];

    if (!param) {
      return new Promise((resolve, reject) => resolve([]));
    } else {
      return this.service.history(param).then(resp => resp ? resp : null);
    }
  }
}
