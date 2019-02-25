/**
 * Created by tsschmi on 2/28/17.
 */

import {Injectable} from '@angular/core';
import {Service, Change, Commit, GitStatus} from 'mgmt-lib';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ControlsService extends Service {

  status: GitStatus;

  constructor(public http: HttpClient,
              public dialog: MatDialog) {
    super(http, dialog);
    // this.callStatus();
  }

  callStatus() {
    setTimeout(() => {
      this.gitStatus();
      this.callStatus();
    }, 60 * 1000);
  }

  commit(msg: string): Observable<string> {
    return this.post('api/commit', msg);
  }

  publish(): Observable<string> {
    return this.getText('api/commit/publish');
  }

  submit(msg): Observable<string> {
    return this.postText('api/submit', msg);
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
    return this.getText( 'api/commit/sync');
  }

}
