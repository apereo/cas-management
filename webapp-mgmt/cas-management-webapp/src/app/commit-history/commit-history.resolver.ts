import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {DiffEntry} from '../../domain/diff-entry';
import {Observable} from 'rxjs/internal/Observable';
import {map, take} from 'rxjs/operators';

@Injectable()
export class CommitHistoryResolve implements Resolve<DiffEntry[]> {

  constructor(private service: CommitHistoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params['id'];
    return param ? this.service.history(param).pipe(take(1)) : [];
  }
}
