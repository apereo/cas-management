import {Injectable} from '@angular/core';
import {Branch} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service that handles requests to the server for submits.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SubmitService extends Service {

  controller = 'api/submit';

  /**
   * Calls the server to get all submits to the registry.
   *
   * @param msg - message for spinner
   */
  getSubmits(msg?: string): Observable<Branch[]> {
    return this.get<Branch[]>(this.controller, msg);
  }

  /**
   * Reverts the pull request with the passed name.
   *
   * @param name - name of branch to revert
   */
  revert(name: string): Observable<string> {
    return this.getText(this.controller + '/revert/' + name, 'Reverting');
  }

}
