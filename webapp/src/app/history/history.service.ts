/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {History} from '../../domain/history';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class HistoryService extends Service {

  controller = 'versionControl/';

  history(fileName: string): Observable<History[]> {
    return this.get<History[]>(this.controller + 'history?path=' + fileName);
  }

  checkout(id: string, path: String): Observable<String> {
    return this.getText(this.controller + 'checkout?id=' + id + '&path=' + path);
  }

  change(commit: String, path: String): Observable<String> {
    return this.getText(this.controller + 'changeMade?id=' + commit + '&path=' + path);
  }

  toHead(commit: String, path: String): Observable<String> {
    return this.getText(this.controller + 'compareWithHead?id=' + commit + '&path=' + path);
  }
}
