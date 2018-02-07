/**
 * Created by tsschmi on 2/28/17.
 */

import {Injectable} from '@angular/core';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';
import {Change} from '../../domain/change';
import {Commit} from '../../domain/commit';
import {GitStatus} from '../../domain/git-status';

@Injectable()
export class ControlsService extends Service {

  status: GitStatus;

  constructor(http: HttpClient) {
    super(http);
  }

  commit(msg: String): Promise<String> {
    return this.getText('commit?msg=' + msg);
  }

  publish(): Promise<String> {
    return this.getText('publish');
  }

  submit(msg): Promise<String> {
    return this.postText('submit', msg);
  }


  untracked(): Promise<Change[]> {
    return this.get<Change[]>('untracked')
      .then(resp => resp);
  }

  getCommits(): Promise<Commit[]> {
    return this.get<Commit[]>('commitList')
      .then(resp => resp);
  }

  gitStatus() {
    this.get<GitStatus>('gitStatus').then(resp => this.status = resp);
  }

}
