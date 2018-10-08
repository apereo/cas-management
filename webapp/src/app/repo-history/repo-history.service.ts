import {Injectable} from '@angular/core';
import {Service} from '../service';
import {Commit} from '../../domain/commit';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class RepoHistoryService extends Service {

  controller = 'versionControl/';

  commitLogs(): Observable<Commit[]> {
    return this.get<Commit[]>(this.controller + 'commits');
  }

  checkout(id: String): Observable<String> {
    return this.getText(this.controller + 'checkoutCommit?id=' + id);
  }
}
