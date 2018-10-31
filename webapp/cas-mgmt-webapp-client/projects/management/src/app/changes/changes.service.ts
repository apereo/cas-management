/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractRegisteredService, DiffEntry, Service} from 'mgmt-lib';

@Injectable()
export class ChangesService extends Service {

  controller = '/api/change';

  getChanges(branch: String): Observable<DiffEntry[]> {
    return this.post<DiffEntry[]>(this.controller, branch);
  }

  viewJson(id: String): Observable<String> {
    return this.getText(this.controller + '/json/' + id);
  }

  viewYaml(id: String): Observable<String> {
    return this.getText(this.controller + '/yaml/' + id);
  }

  viewDiff(oldId: String, newId: String): Observable<String> {
    const data = [oldId, newId];
    return this.postText(this.controller + '/diff', data);
  }

  getChangePair(change: String): Observable<AbstractRegisteredService[]> {
    return this.get<AbstractRegisteredService[]>(this.controller + '/pair/' + change);
  }

}
