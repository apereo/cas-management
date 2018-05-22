/**
 * Created by tsschmi on 2/28/17.
 */

import {Injectable} from '@angular/core';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';
import {Change} from '../../domain/change';
import {Commit} from '../../domain/commit';
import {GitStatus} from '../../domain/git-status';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class ControlsService extends Service {

  status: GitStatus;

  constructor(http: HttpClient) {
    super(http);
  }

  commit(msg: String): Observable<String> {
    return this.getText('commit?msg=' + msg);
  }

  publish(): Observable<String> {
    return this.getText('publish');
  }

  submit(msg): Observable<String> {
    return this.postText('submit', msg);
  }


  untracked(): Observable<Change[]> {
    return this.get<Change[]>('untracked')
  }

  getCommits(): Observable<Commit[]> {
    return this.get<Commit[]>('commitList')
  }

  gitStatus() {
    this.get<GitStatus>('gitStatus')
      .subscribe((resp: GitStatus) => this.status = resp);
  }

  sync(): Observable<String> {
    return this.getText('sync');
  }

}
