/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { History } from '../../domain/history';
import {CommitHistoryService} from './commit-history.service';
import {DiffEntry} from '../../domain/diff-entry';

@Injectable()
export class CommitHistoryResolve implements Resolve<DiffEntry[]> {

  constructor(private service: CommitHistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<DiffEntry[]> {
    const param: string = route.params['id'];

    if (!param) {
      return new Promise((resolve, reject) => resolve([]));
    } else {
      return this.service.history(param).then(resp => resp ? resp : null);
    }
  }
}
