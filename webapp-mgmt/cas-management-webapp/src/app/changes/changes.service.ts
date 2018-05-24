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

  getChanges(branch: String): Observable<DiffEntry[]> {
    return this.get<DiffEntry[]>('changes?branch=' + branch);
  }

  viewJson(id: String): Observable<String> {
    return this.getText('viewJSON?id=' + id);
  }

  viewYaml(id: String): Observable<String> {
    return this.getText('viewYaml?id=' + id);
  }

  viewDiff(oldId: String, newId: String): Observable<String> {
    const data = [oldId, newId];
    return this.postText('viewDiff', data);
  }

  getChange(change: String): Observable<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>('viewChange?id=' + change);
  }

  getChangePair(change: String): Observable<AbstractRegisteredService[]> {
    return this.get<AbstractRegisteredService[]>('changePair?id=' + change);
  }

}
