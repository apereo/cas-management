import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {DiffEntry} from 'domain-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommitHistoryResolve implements Resolve<DiffEntry[]> {

  constructor(private service: CommitHistoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params['id'];
    if (param) {
      return this.service.history(param);
    }
    return [];
  }
}
