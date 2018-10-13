/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import { Branch } from '../../domain/branch';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class SubmitService extends Service {

  controller = 'delegated/';

  getSubmits(): Observable<Branch[]> {
    return this.get<Branch[]>(this.controller + 'submitRequests');
  }

  revert(name: string): Observable<String> {
    return this.getText(this.controller + 'revertSubmit?branchName=' + name);
  }

}
