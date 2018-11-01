/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {History, Service} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class HistoryService extends Service {

  controller = 'api/history';

  history(fileName: string): Observable<History[]> {
    return this.post<History[]>(this.controller, fileName);
  }

  checkout(id: string, path: String): Observable<String> {
    return this.postText(this.controller + 'checkout', {path, id});
  }

  change(commit: String, path: String): Observable<String> {
    return this.postText(this.controller + 'made', {path, commit});
  }

  toHead(commit: String, path: String): Observable<String> {
    return this.postText(this.controller + 'head', {path, commit});
  }
}
