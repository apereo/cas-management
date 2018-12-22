/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractRegisteredService, DiffEntry, Service} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class ChangesService extends Service {

  controller = 'api/change';

  getChanges(branch: string): Observable<DiffEntry[]> {
    return this.post<DiffEntry[]>(this.controller, branch);
  }

  viewJson(id: string): Observable<string> {
    return this.getText(this.controller + '/json/' + id);
  }

  viewYaml(id: string): Observable<string> {
    return this.getText(this.controller + '/yaml/' + id);
  }

  viewDiff(oldId: string, newId: string): Observable<string> {
    const data = [oldId, newId];
    return this.postText(this.controller + '/diff', data);
  }

  getChangePair(change: string): Observable<AbstractRegisteredService[]> {
    return this.get<AbstractRegisteredService[]>(this.controller + '/pair/' + change);
  }

}
