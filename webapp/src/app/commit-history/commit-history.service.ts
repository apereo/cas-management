/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Service} from '../service';
import {DiffEntry} from '../../domain/diff-entry';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class CommitHistoryService extends Service {

  controller = 'versionControl/';

  history(id: string): Observable<DiffEntry[]> {
    return this.get<DiffEntry[]>(this.controller + 'commitHistoryList?id=' + id);
  }

  checkout(id: string, path: String): Observable<String> {
    return this.getText(this.controller + 'checkout?id=' + id + '&path=' + path);
  }

  revertRepo(id: string): Observable<String> {
    return this.getText(this.controller + 'revertRepo?id=' + id);
  }

  change(commit: String, path: String): Observable<String> {
    return this.getText(this.controller + 'changeMade?id=' + commit + '&path=' + path);
  }

  toHead(commit: String, path: String): Observable<String> {
    return this.getText(this.controller + 'compareWithHead?id=' + commit + '&path=' + path);
  }
}
