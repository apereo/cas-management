import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Commit} from '@apereo/mgmt-lib/src/lib/model';
import {Observable} from 'rxjs/internal/Observable';
import {HistoryService} from '../history/history.service';

/**
 * Resolver to retrieve the list of commits in the repository before navigating to RepoHistoryComponent.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class RepoHistoryResolver implements Resolve<Commit[]> {

  constructor(private service: HistoryService) {}

  /**
   * Returns list of all commits in the repository.
   *
   * @param route - route snapshot
   * @param state - route state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Commit[]> {
    return this.service.commitLogs();
  }
}
