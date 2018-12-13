import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {DiffEntry, SpinnerService} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommitHistoryResolve implements Resolve<DiffEntry[]> {

  constructor(private service: CommitHistoryService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params['id'];
    if (param) {
      this.spinner.start('Loading history');
      return this.service.history(param).pipe(finalize(() => this.spinner.stop()));
    }
    return [];
  }
}
