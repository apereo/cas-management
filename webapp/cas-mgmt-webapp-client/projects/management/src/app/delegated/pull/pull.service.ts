/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import {Branch, Service} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PullService extends Service {

  controller = 'api/pull';

  getBranches(options: boolean[]): Observable<Branch[]> {
    return this.post<Branch[]>(this.controller, options);
  }

  accept(branch: Branch, note: string): Observable<string> {
    return this.postText(this.controller + '/accept', { branch: branch, note: note});
  }

  reject(branch: Branch, note: string): Observable<string> {
    return this.postText(this.controller + '/reject', { branch: branch, note: note});
  }

}
