import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { History } from '../../domain/history';
import {CommitHistoryService} from './commit-history.service';
import {DiffEntry} from '../../domain/diff-entry';
import {Observable} from 'rxjs/internal/Observable';
import {map, take} from 'rxjs/operators';

@Injectable()
export class CommitHistoryResolve implements Resolve<DiffEntry[]> {

  constructor(private service: CommitHistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> {
    const param: string = route.params['id'];

    if (!param) {
      return new Observable<DiffEntry[]>();
    } else {
      this.service.history(param).pipe(
        take(1),
        map(resp => {
          if (resp) {
            return resp;
          } else {
            return null;
          }
        })
      );
    }
  }
}
