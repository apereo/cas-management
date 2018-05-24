import {Injectable} from '@angular/core';
import {Service} from '../service';
import {Commit} from '../../domain/commit';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class RepoHistoryService extends Service {

  commitLogs(): Observable<Commit[]> {
    return this.get<Commit[]>('commits');
  }

  checkout(id: String): Observable<String> {
    return this.getText('checkoutCommit?id=' + id);
  }
}
