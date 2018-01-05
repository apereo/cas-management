/**
 * Created by tsschmi on 2/28/17.
 */

import {Injectable} from '@angular/core';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';
import {Change} from '../../domain/change';
import {Commit} from '../../domain/commit';

@Injectable()
export class ControlsService extends Service {

  changes: Change[];
  commits: Commit[];

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
      .then(resp => this.handleUntracked(resp));
  }

  handleUntracked(changes: Change[]): Change[] {
    this.changes = changes;
    if (this.changes.length === 0) {
      this.changes = null;
    }
    return this.changes;
  }

  unpublished(): Promise<number> {
    return this.get<number>('unpublished')
  }

  isChanged(id: String): Change {
    let change: Change;
    if (this.changes) {
      this.changes.forEach((c) => {
        if (c.id === id) {
          change = c;
        }
      });
      return change;
    }
  }

  changeStyle(id: String): String {
    const change: Change = this.isChanged(id);
    if (change) {
      switch (change.changeType) {
        case 'MODIFY' :
          return 'modified';
        case 'DELETE' :
          return 'deleted';
        case 'ADD' :
          return 'added';
      }
    }
    return 'inherit';
  }

  revertable(id: String): boolean {
    const change: Change = this.isChanged(id);
    if (change) {
      switch (change.changeType) {
        case 'MODIFY' :
        case 'DELETE' :
          return true;
      }
    }
    return false;
  }

  getCommits(): Promise<Commit[]> {
    return this.get<Commit[]>('commitList')
      .then(resp => this.handleCommits(resp));
  }

  handleCommits(commits: Commit[]): Commit[] {
    this.commits = commits;
    return commits;
  }

}
