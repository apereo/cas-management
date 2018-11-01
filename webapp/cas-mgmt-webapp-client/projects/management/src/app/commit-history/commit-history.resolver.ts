import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {DiffEntry} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';
import {take} from 'rxjs/operators';

@Injectable()
export class CommitHistoryResolve implements Resolve<DiffEntry[]> {

  constructor(private service: CommitHistoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params['id'];
    return param ? this.service.history(param).pipe(take(1)) : [];
  }
}
