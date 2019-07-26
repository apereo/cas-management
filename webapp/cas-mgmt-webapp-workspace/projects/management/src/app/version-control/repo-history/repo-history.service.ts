import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {Commit} from 'domain-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RepoHistoryService extends Service {

  controller = 'api/history';

  commitLogs(): Observable<Commit[]> {
    return this.get<Commit[]>(this.controller);
  }

  checkout(id: string): Observable<string> {
    return this.getText(this.controller + '/checkout/' + id);
  }
}
