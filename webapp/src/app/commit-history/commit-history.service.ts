/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Service} from '../service';
import {DiffEntry} from '../../domain/diff-entry';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class CommitHistoryService extends Service {

  history(id: string): Observable<DiffEntry[]> {
    return this.get<DiffEntry[]>('history/commit/' + id);
  }

  checkout(id: string, path: String): Observable<String> {
    return this.getText('history/checkout/' + path + '/' + id);
  }

  revert(id: string): Observable<String> {
    return this.getText( 'history/revert/' + id);
  }

  change(commit: String, path: String): Observable<String> {
    return this.postText('change/made', [path, commit]);
  }

  toHead(commit: String, path: String): Observable<String> {
    return this.postText('change/head', [path, commit]);
  }
}
