import {Injectable} from '@angular/core';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service for handling requests to the server for commit history changes.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class CommitHistoryService extends Service {

  /**
   * Calls the server to get the changes made in this commit.
   *
   * @param commit - commit id
   * @param path - service path in commit.
   */
  change(commit: string, path: string): Observable<string> {
    return this.postText('api/change/made', [path, commit]);
  }

  /**
   * Calls the server to get the diff between the commit version and the current version.
   *
   * @param commit - commit id
   * @param path - service path in commit
   */
  toHead(commit: string, path: string): Observable<string> {
    return this.postText('api/change/head', [path, commit]);
  }
}
