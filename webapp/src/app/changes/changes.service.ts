/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import {DiffEntry} from '../../domain/diff-entry';
import {Service} from '../service';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class ChangesService extends Service {

  controller = 'versionControl/';

  getChanges(branch: String): Observable<DiffEntry[]> {
    return this.get<DiffEntry[]>(this.controller + 'changes?branch=' + branch);
  }

  viewJson(id: String): Observable<String> {
    return this.getText(this.controller + 'viewJSON?id=' + id);
  }

  viewYaml(id: String): Observable<String> {
    return this.getText(this.controller + 'viewYaml?id=' + id);
  }

  viewDiff(oldId: String, newId: String): Observable<String> {
    const data = [oldId, newId];
    return this.postText(this.controller + 'viewDiff', data);
  }

  getChange(change: String): Observable<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>(this.controller + 'viewChange?id=' + change);
  }

  getChangePair(change: String): Observable<AbstractRegisteredService[]> {
    return this.get<AbstractRegisteredService[]>(this.controller + 'changePair?id=' + change);
  }

}
