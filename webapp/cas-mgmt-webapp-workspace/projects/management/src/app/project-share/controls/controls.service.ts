/**
 * Created by tsschmi on 2/28/17.
 */

import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {Change, Commit, GitStatus} from 'domain-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ControlsService extends Service {

  status: GitStatus;

  callStatus() {
    setTimeout(() => {
      this.gitStatus();
      this.callStatus();
    }, 60 * 1000);
  }

  commit(msg: string): Observable<string> {
    return this.post('api/commit', msg, 'Committing');
  }

  publish(): Observable<string> {
    return this.getText('api/commit/publish', 'Publishing');
  }

  submit(msg): Observable<string> {
    return this.postText('api/submit', msg, 'Submitting');
  }

  untracked(): Observable<Change[]> {
    return this.get<Change[]>('api/change/untracked');
  }

  getCommits(): Observable<Commit[]> {
    return this.get<Commit[]>('api/commit/unpublished');
  }

  gitStatus() {
    this.get<GitStatus>('api/commit/status')
      .subscribe(resp => this.status = resp);
  }

  sync(): Observable<string> {
    return this.getText( 'api/commit/sync', 'Syncing');
  }

}
