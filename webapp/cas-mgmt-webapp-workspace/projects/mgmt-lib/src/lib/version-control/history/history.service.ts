import {Injectable} from '@angular/core';
import {Commit, DiffEntry, History} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service to handle request to the server for history.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class HistoryService extends Service {

  controller = 'api/history';

  /**
   * Calls the server and returns the history of service in the repository.
   *
   * @param fileName - path of the service in the repository
   */
  history(fileName: string): Observable<History[]> {
    return this.post<History[]>(this.controller, fileName);
  }

  /**
   * Calls the server to checkout the file in the commit to be current working change.
   *
   * @param id - commit id
   * @param path - path to service in the commit
   */
  checkout(id: string, path: string): Observable<string> {
    return this.postText(this.controller + 'checkout', {path, id});
  }

  /**
   * Calles the server to get the changes for a commit in the repository.
   *
   * @param id - commit id
   */
  commitHistory(id: string): Observable<DiffEntry[]> {
    return this.get<DiffEntry[]>(this.controller + '/commit/' + id);
  }

  /**
   * Calls the server to create a new working change of the service the same as the verision at the commit.
   *
   * @param id - commit id
   * @param path - service path in the commit
   */
  commitCheckout(id: string, path: string): Observable<string> {
    return this.getText(this.controller + '/checkout/' + path + '/' + id);
  }

  /**
   * Reverts the services in the commit to the version in this commit.
   *
   * @param id - commit id
   */
  revert(id: string): Observable<string> {
    return this.getText( this.controller + '/revert/' + id);
  }

  /**
   * Calls the server to return all the commits in the repository.
   */
  commitLogs(): Observable<Commit[]> {
    return this.get<Commit[]>(this.controller);
  }

  /**
   * Checks out all the service verisons in the passed commit.
   *
   * @param id - commit id
   */
  checkoutCommit(id: string): Observable<string> {
    return this.getText(this.controller + '/checkout/' + id);
  }
}
