import {Injectable} from '@angular/core';
import {Service} from '../service';
import {Commit} from '../../domain/commit';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RepoHistoryService extends Service {

  constructor(http: HttpClient) {
    super(http);
  }

  commitLogs(): Promise<Commit[]> {
    return this.get<Commit[]>('commits');
  }

  checkout(id: String): Promise<String> {
    return this.getText('checkoutCommit?id=' + id);
  }
}
