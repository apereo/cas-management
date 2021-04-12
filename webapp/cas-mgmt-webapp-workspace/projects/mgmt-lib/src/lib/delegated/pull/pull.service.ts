import {Injectable} from '@angular/core';
import {Branch} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service to handle requests for pull requests by users.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class PullService extends Service {

  controller = 'api/pull';

  /**
   * Calls the server to retrieve branches with the state options.
   *
   * @param options - state options [pending, accepted, rejected]
   * @param msg - message to display in spinner
   */
  getBranches(options: boolean[], msg: string): Observable<Branch[]> {
    return this.post<Branch[]>(this.controller, options, msg);
  }

  /**
   * Calls the server to accept the pull request passed with a note from the admin.
   *
   * @param branch - branch where pull request is to be accepted
   * @param note - acceptance note from admin
   */
  accept(branch: Branch, note: string): Observable<string> {
    return this.postText(this.controller + '/accept', { branch, note}, 'Accepting Request');
  }

  /**
   * Calls the server to reject the pull request passed with a note from the admin.
   *
   * @param branch - branch where pull request is to be rejected
   * @param note - rejection note from admin
   */
  reject(branch: Branch, note: string): Observable<string> {
    return this.postText(this.controller + '/reject', { branch, note}, 'Rejecting Request');
  }

}
