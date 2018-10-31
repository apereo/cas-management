/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Service, DiffEntry} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class CommitHistoryService extends Service {

  history(id: string): Observable<DiffEntry[]> {
    return this.get<DiffEntry[]>('/api/history/commit/' + id);
  }

  checkout(id: string, path: String): Observable<String> {
    return this.getText('/api/history/checkout/' + path + '/' + id);
  }

  revert(id: string): Observable<String> {
    return this.getText( '/api/history/revert/' + id);
  }

  change(commit: String, path: String): Observable<String> {
    return this.postText('/api/change/made', [path, commit]);
  }

  toHead(commit: String, path: String): Observable<String> {
    return this.postText('/api/change/head', [path, commit]);
  }
}
