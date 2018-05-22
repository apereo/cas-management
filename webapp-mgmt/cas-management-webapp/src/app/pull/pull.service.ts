/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import { Branch } from '../../domain/branch';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class PullService extends Service {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getBranches(options: boolean[]): Observable<Branch[]> {
    return this.post<Branch[]>('pullRequests', options);
  }

  accept(branch: Branch, note: String): Observable<String> {
    return this.postText('acceptBranch', { branch: branch, note: note});
  }

  reject(branch: Branch, note: String): Observable<String> {
    return this.postText('rejectBranch', { branch: branch, note: note});
  }

}
