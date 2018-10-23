/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import { Branch } from '../../domain/branch';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class PullService extends Service {

  controller = 'pull';

  getBranches(options: boolean[]): Observable<Branch[]> {
    return this.post<Branch[]>(this.controller, options);
  }

  accept(branch: Branch, note: String): Observable<String> {
    return this.postText(this.controller + '/accept', { branch: branch, note: note});
  }

  reject(branch: Branch, note: String): Observable<String> {
    return this.postText(this.controller + '/reject', { branch: branch, note: note});
  }

}
