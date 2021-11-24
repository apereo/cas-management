import {Injectable} from '@angular/core';
import {Branch} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

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
    return this.get<Branch[]>(this.controller, msg).pipe(
      map((branches: Branch[]) => branches.map(b => {
        let msg = b.msg,
          json;
        try {
          json = JSON.parse(msg);
        } catch (err) {}
        const branch = {
          ...b,
          msg: json ? json.message : msg,
          title: json ? json.title : null
        };

        return branch;
      }))
    );
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
