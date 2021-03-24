import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {DiffEntry} from '@apereo/mgmt-lib/src/lib/model';
import {Observable} from 'rxjs/internal/Observable';
import {HistoryService} from '../history/history.service';

/**
 * Resolver to retrieve changes in a commit before navigating to the CommitHistory component.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class CommitHistoryResolve implements Resolve<DiffEntry[]> {

  constructor(private service: HistoryService) {}

  /**
   * Returns all the changes for the routed commit id.
   *
   * @param route - route snapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params.id;
    if (param) {
      return this.service.commitHistory(param);
    }
    return [];
  }
}
