/**
 * Created by tschmidt on 2/15/17.
 */
import {Injectable} from '@angular/core';
import {DiffEntry} from '../../domain/diff-entry';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';
import {AbstractRegisteredService} from '../../domain/registered-service';

@Injectable()
export class ChangesService extends Service {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getChanges(branch: String): Promise<DiffEntry[]> {
    return this.get<DiffEntry[]>('changes?branch=' + branch);
  }

  viewJson(id: String): Promise<String> {
    return this.getText('viewJSON?id=' + id);
  }

  viewYaml(id: String): Promise<String> {
    return this.getText('viewYaml?id=' + id);
  }

  viewDiff(oldId: String, newId: String): Promise<String> {
    const data = [oldId, newId];
    return this.postText('viewDiff', data);
  }

  getChange(change: String): Promise<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>('viewChange?id=' + change);
  }

}
